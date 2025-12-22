import { defineConfig } from "astro/config";
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: "https://your.site",
  output: 'server', // Use server mode to support API routes
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [sitemap()],
  image: {
    // Enable Sharp-based image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false, // Allow processing large images
      },
    },
    // Configure responsive image behavior
    layout: 'constrained',
    // Allow remote image optimization for podcast platforms
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  devToolbar: {
    enabled: false,
  },
});
