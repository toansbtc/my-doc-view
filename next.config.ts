import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/henryNguyen/:path*',
        destination: 'https://my-doc-rho.vercel.app/henryNguyen/:path*',
      },
    ]
  },
  /* config options here */
};

module.exports = {
  allowedDevOrigins: ["*"]
}

export default nextConfig;
