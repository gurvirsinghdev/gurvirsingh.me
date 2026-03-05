/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "my-portfolio",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: { region: "us-west-2" },
        tls: "5.3.0",
        cloudflare: "6.13.0",
      },
    };
  },
  async run() {
    const httpPortfolio = new sst.aws.Nextjs("HttpPortfolio", {
      path: "apps/web",
    });
    sst.Linkable.wrap(tls.PrivateKey, (resource) => ({
      properties: {
        publicKey: resource.publicKeyOpenssh,
        privateKey: resource.privateKeyOpenssh,
      },
    }));
    const connectionKey = new tls.PrivateKey("ConnectionKey", {
      algorithm: "ED25519",
    });
    const vpc = new sst.aws.Vpc("PortfolioPrivateCloud", {
      bastion: true,
      nat: { ec2: { instance: "t4g.nano" } },
      transform: {
        securityGroup: {
          ingress: [
            {
              protocol: "tcp",
              fromPort: 22,
              toPort: 22,
              cidrBlocks: ["0.0.0.0/0"],
            },
            {
              protocol: "tcp",
              fromPort: 2222,
              toPort: 2222,
              cidrBlocks: ["0.0.0.0/0"],
            },
          ],
          egress: [
            {
              protocol: "-1",
              fromPort: 0,
              toPort: 0,
              cidrBlocks: ["0.0.0.0/0"],
            },
          ],
        },
      },
    });
    const applicationCluster = new sst.aws.Cluster(
      "PortfolioPrivateCloudCluster",
      { vpc: vpc, forceUpgrade: "v2" },
    );
    const sshService = new sst.aws.Service("sshPortfolioService", {
      wait: $app.stage === "production",
      cluster: applicationCluster,
      cpu: "0.25 vCPU",
      memory: "0.5 GB",
      capacity: "spot",
      architecture: "arm64",
      scaling: { min: 1, max: 1 },
      image: { context: "apps/wish" },
      link: [connectionKey],
      public: {
        domain: {
          name: "gurvirsingh.me",
          dns: sst.cloudflare.dns(),
        },
        rules: [{ listen: "22/tcp", forward: "2222/tcp" }],
      },
      transform: {
        service: {
          networkConfiguration: {
            subnets: vpc.publicSubnets,
            assignPublicIp: true,
            securityGroups: vpc.securityGroups,
          },
        },
        target: { preserveClientIp: "true" },
      },
    });
    new sst.x.DevCommand("DevSshPortfolioService", {
      link: [connectionKey],
      dev: {
        autostart: true,
        directory: "apps/wish",
        command: "go run cmd/main.go",
      },
    });
    return { httpPortfolio: httpPortfolio.url };
  },
});
