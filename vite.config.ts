import legacy from '@vitejs/plugin-legacy';
import vue from "@vitejs/plugin-vue";
import path from "path";
import {
  defineConfig
} from 'vite';
import viteCompression from "vite-plugin-compression";
import {
  VitePWA
} from "vite-plugin-pwa";
import styleImport from "vite-plugin-style-import";
import {
  viteVConsole
} from "vite-plugin-vconsole";

// https://vitejs.dev/config/
export default defineConfig(({
  command,
  mode
}) => {
  let localEnabled = command === "serve"
  let enabled = command === "serve" || ["test", "development"].indexOf(mode) !== -1

  return {
    plugins: [
      vue({
        script: {
          refSugar: true,
        },
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      VitePWA({
        mode,
        filename: "qhgc-cashier-ws.js",
        registerType: 'autoUpdate',
        workbox: {
          skipWaiting: true,
          globPatterns: ["**.{js,css,html}", "assets/*"],
          globIgnores: ["**.{map,xls}"],
          runtimeCaching: [{
              urlPattern: /'*\.html/,
              handler: "NetworkOnly",
            },
            {
              urlPattern: /'*\.(?:js|css)/,
              handler: "NetworkFirst",
            },
            {
              urlPattern: /'*\.(?:png|jpg|jpeg|svg|gif)/,
              handler: "CacheFirst",
            }
          ],
        },
      }),
      viteCompression(),
      styleImport({
        libs: [{
          libraryName: "",
          esModule: true,
          resolveStyle: (name) => `/vant/es/${name}/style/index`,
        }, ],
      }),
      viteVConsole({
        entry: path.resolve("../src/main.js").replace(/\\/g, '/'), // entry file
        localEnabled: localEnabled, // dev environmentc
        enabled: enabled, // build production
        config: {
          // vconsole options
          maxLogNumber: 1000,
          theme: "light",
          onReady: () => {
            console.log("vConsole is Ready!")
          }
        },
      }),
    ],
    build: {
      rollupOptions: {
        // plugins: [
        //   CommonJS()
        // ]
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true
        }
      },
      target: 'es2015'
    },
    envDir: "env",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".ts", ".json", ".scss"]
    },
    base: './',
    server: {
      host: "0.0.0.0",
      open: true,
      port: 3001,
      proxy: {
        // '/api': {
        //   target: 'https://xxxxx.com/',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ""),
        // },
      },
    },
  };
});