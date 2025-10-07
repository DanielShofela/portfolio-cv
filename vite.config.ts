import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Serve the existing `img/` folder as Vite's public directory so
      // files inside are copied as-is to the build output and are available
      // at the site root (e.g. /CV professionnel.png).
      publicDir: 'img',
      // Use a relative base which makes the production build work when
      // deployed to subpaths or file-based hosts. Adjust if you deploy to a
      // fixed absolute domain path.
      base: './',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
