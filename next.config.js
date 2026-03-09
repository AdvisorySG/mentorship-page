/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  reactStrictMode: true,

  // FIXME: get rid of this before launch!
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
