import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: "import { h } from 'vue';",
  },

  // 样式处理配置项
  css: {
    // CSS module
    modules: {
      generateScopedName: `_[name]_[local]_[hash:base64:6]_`,
    },

    // 传递给特定css样式预处理器的配置
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".jsx", ".ts", ".vue", ".tsx", ".json", ".less"],
  },
  server: {
    host: "0.0.0.0",
    port: 8000,
  },
  define: {
    __VUE_OPTIONS_API__: false, // 关闭 Vue2 中的 options选项API
  },
});
