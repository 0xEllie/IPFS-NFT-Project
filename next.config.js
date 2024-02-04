/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  env: {
    PROJECT_ID: "Get projectId at https://cloud.walletconnect.com",
  },
};

module.exports = nextConfig;
