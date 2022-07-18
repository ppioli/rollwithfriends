/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Ensures no server modules are included on the client.
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /lib\/server/,
        })
      );
    }

    return config;
  },
  compiler: {
    relay: {
      // This should match relay.config.js
      src: "./src",
      language: "typescript",
      artifactDirectory: "src/__generated__",
      schemaExtensions: ["./graphql"],
    },
  },
};

module.exports = nextConfig;
