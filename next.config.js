/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  output: "export",
  reactStrictMode: true,

  // FIXME: get rid of this before launch!
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable css--modules component styling

  // Source: https://cwtuan.blogspot.com/2022/10/disable-css-module-in-nextjs-v1231-sept.html

  webpack(config) {
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;

      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes("_app")) return;

          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });

    // see https://huggingface.co/docs/transformers.js/en/tutorials/next#step-2-install-and-configure-transformersjs
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };

    return config;
  },
};

module.exports = nextConfig;
