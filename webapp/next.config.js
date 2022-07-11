/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    relay: {
      // This should match relay.config.js
      src: "./src",
      language: "typescript",
      artifactDirectory: "src/__generated__",
    },
  },
};

module.exports = nextConfig;
