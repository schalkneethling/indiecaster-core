import { defineConfig } from "astro/config";
import sitemap from '@astrojs/sitemap';

import { indieCasterConfig } from './indiecaster.config.js';

// https://astro.build/config
export default defineConfig({
  site: `https://${indieCasterConfig.domain}`,
  output: 'static', // Explicitly set output mode to static
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
