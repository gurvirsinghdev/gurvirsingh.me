/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "my-portfolio",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: { region: "ca-central-1" },
        cloudflare: "6.13.0",
      },
    };
  },
  async run() {
    const httpPortfolio = new sst.aws.Nextjs("HttpPortfolio", {
      path: "apps/web",
      domain: {
        name: "gurvirsingh.me",
        dns: sst.cloudflare.dns({
          zone: process.env.CLOUDFLARE_ZONE,
        }),
        redirects: ["www.gurvirsingh.me"],
      },
    });

    return { httpPortfolio: httpPortfolio.url };
  },
});
