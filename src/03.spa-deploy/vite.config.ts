import path from 'path';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    resolve: {
        alias: {
            '@pages': path.resolve(__dirname, 'src/pages')
        }  
    },
    plugins: [
        vue()
    ],
    server: {
        port: 2233
    },
    preview: {
        port: 3001
    }
});
