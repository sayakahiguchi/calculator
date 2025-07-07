/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";
        @use "/src/styles/Foundation/Functions/index.scss" as *;
        @use "/src/styles/Foundation/Mixins/index.scss" as *;
        @use "/src/styles/Foundation/Variables/index.scss" as *;
        `
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts', // 任意：テスト前の初期化
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  }
});