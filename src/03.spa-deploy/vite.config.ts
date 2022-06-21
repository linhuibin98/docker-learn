import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
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
