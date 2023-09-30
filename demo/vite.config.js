import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

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
                // external: [
                //     '@ckeditor/ckeditor5-core',
                //     fileURLToPath(
                //         new URL(
                //             'src/some-local-file-that-should-not-be-bundled.js',
                //             import.meta.url
                //         )
                //     ),
                //     /node_modules/
                // ]
                // , '@ckeditor/ckeditor5-ui', '@ckeditor/ckeditor5-utils', '@ckeditor/ckeditor5-upload', '@ckeditor/ckeditor5-vue', '@ckeditor/ckeditor5-vue2', '@ckeditor/ckeditor5-vue-component', '@ckeditor/ckeditor5-vue-ui', '@ckeditor/ckeditor5-watchdog', 'vue', 'vue2'],
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
