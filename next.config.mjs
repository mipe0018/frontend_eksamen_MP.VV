/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend-eksamen-mp-vv.onrender.com",
        pathname: "/file-bucket/**",
      },
    ],
  },
};

export default nextConfig;