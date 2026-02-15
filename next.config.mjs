/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/preview": ["./lib/stamp/templates/**/*.svg"],
      "/api/export": ["./lib/stamp/templates/**/*.svg"],
    },
  },
};

export default nextConfig;
