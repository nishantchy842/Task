/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // BASE_URL: "https://namastenewz.onrender.com/api/",
    BASE_URL: "http://localhost:3001/api/",
  },
  images: {
    domains: ["localhost", "picsum.photos", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/upload/image/**",
      },
    ],
  },
};

export default nextConfig;
