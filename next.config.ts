import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home/users",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
