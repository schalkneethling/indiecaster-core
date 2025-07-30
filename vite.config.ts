import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['astro'],
          // Separate podcast-specific code
          podcast: ['astro:assets'],
        },
      },
    },
    // Enable minification
    minify: 'terser',
    // Optimize CSS
    cssMinify: true,
    // Generate source maps for debugging
    sourcemap: false, // Disable in production for smaller bundles
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['astro:assets'],
  },
}); 
