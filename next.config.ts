import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    /* The "images.domains" configuration is deprecated. 
    Please use "images.remotePatterns" configuration instead. */
    // domains: [
    //   'files.stripe.com',
    // ]
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
    ]
  }
};

export default nextConfig
