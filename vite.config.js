import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite'
import MotionResolver from 'motion-v/resolver'
import path from 'path';
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),tailwindcss(),
        vue(),
        Components({
            dts: true, // Genera tipado automático (opcional)
            resolvers: [
              MotionResolver() // Autoimporta los componentes de Motion
            ],
          }),
    ],
    resolve: {
        
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
});

