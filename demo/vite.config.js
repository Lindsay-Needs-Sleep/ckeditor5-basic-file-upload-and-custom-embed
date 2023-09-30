/* eslint-env node */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import * as path from 'path';
import { defineConfig } from 'vite';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
    const prod = mode == 'production';
    return {
        build: {
            outDir: './public/',
            emptyOutDir: false,
            copyPublicDir: false,
            sourcemap: prod ? 'hidden' : true,
            lib: {
                entry: './demo.js',
                formats: ['iife'],
                fileName: 'bundle',
                name: 'bundle',
            },
            rollupOptions: {
                output: {
                    // Name output css file
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name === 'style.css') return 'bundle.css';
                        return assetInfo.name;
                    },
                },
            },
            watch: !prod && {
                chokidar: {
                    usePolling: true, // Required for WSL/docker
                }
            },
        },
        resolve: {
            alias: [
                { find: '@ckeditor', replacement: path.resolve(__dirname, 'node_modules/@ckeditor') },
            ],
        },
        plugins: [
            ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
        ],
        server: {
            watch: {
                usePolling: true,
            },
        }
    };
});
