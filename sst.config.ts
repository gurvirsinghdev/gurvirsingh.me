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

    const devSshService = new sst.x.DevCommand("DevSshPortfolioService", {
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
