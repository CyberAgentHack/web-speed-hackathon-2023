import path from 'node:path';

import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import react from '@vitejs/plugin-react';
import gzip from 'rollup-plugin-gzip';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';

import { getFileList } from './tools/get_file_list';

const publicDir = path.resolve(__dirname, './public');
const getPublicFileList = async (targetPath: string) => {
  const filePaths = await getFileList(targetPath);
  const publicFiles = filePaths
    .map((filePath) => path.relative(publicDir, filePath))
    .map((filePath) => path.join('/', filePath));

  return publicFiles;
};

export default defineConfig(async () => {
  const videos = await getPublicFileList(path.resolve(publicDir, 'videos'));

  return {
    build: {
      assetsInlineLimit: 20480,
      cssCodeSplit: true,
      cssTarget: 'es6',
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 40960,
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("react")) {
                return "vendor_react";
              }
            }
          },
        },
        plugins: [visualizer({ gzipSize: true })],
        treeshake: 'recommended',
      },
      target: 'modules',
    },
    plugins: [
      react(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      topLevelAwait(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
        videos,
      }),
      terser({
        compress: {
          global_defs: { '@process.env.NODE_ENV': JSON.stringify('production') },
          toplevel: true,
        },
        mangle: { toplevel: true },
      }),
      gzip(),
    ],
  };
});
