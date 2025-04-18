//@ts-nocheck
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['./src/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        exclude: [
          '**/index.ts',         
          '**/index.tsx',        
          '**/*.test.ts',        
          '**/*.d.ts',           
          '**/vite.config.ts',   
          '**/vitest.setup.ts',
          '**/*.config.js'
        ],
      },
    }
});
