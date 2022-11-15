import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: "import { h } from 'vue';",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: ['.js', '.ts', '.vue', '.txs', '.json'],
  },
  server: {
    host: "0.0.0.0",
    port: 8000,
  },
  define: {
    __VUE_OPTIONS_API__: false, // 关闭 Vue2 中的 options选项API
  },
});
