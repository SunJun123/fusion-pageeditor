// bin/build.js
// node包，commonjs规范
import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [vue(), vueJsx()],
    base: "./",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: ['.js', '.ts', '.vue', '.tsx', '.json', '.scss'],
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: "import { h } from 'vue';",
    },
    build: {
      rollupOptions: {
        input: path.resolve("src/index.ts"),

        // 确保外部化处理那些你不想打包进库的依赖
        external: ["vue"],

        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        output: {
            globals: {
              vue: 'Vue',
            },
          },
      },
      lib: {
        entry: path.resolve("src/index.ts"),
        name: "fusion-render", // umd的变量名
        fileName: (format) => `fusion-components.${format}.production.js`, // 输出文件名
        formats: ["es", "umd"],
      },
      outDir: "dist",
    },
  });
