import { defineConfig, loadEnv } from 'vite';
import VueMacros from 'unplugin-vue-macros/dist/vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import progress from 'vite-plugin-progress';
import legacyPlugin from '@vitejs/plugin-legacy';
import VueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 定义process脚本命令
  define: {
    'process.env':
      process.env.npm_lifecycle_event === 'build'
        ? JSON.stringify('production')
        : JSON.stringify(process.env.npm_lifecycle_event),
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        vueJsx: VueJsx(),
      },
    }),
    legacyPlugin({
      targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
    }),
    progress(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3003,
  },
});
