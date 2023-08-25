import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  productionSourceMap:false,
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: i => `__tla_${i}`
    })
  ],
  resolve:{
    alias:{
      "@": resolve(__dirname,"./src")
    }
  },
  server:{
    proxy: {// 跨域代理
      '/apiSohu': {
        target: 'http://pv.sohu.com/', // localhost=>target
        changeOrigin: true
      },
      '/intf':{
        target: 'http://wp.birdpaper.com.cn/', // localhost=>target
        changeOrigin: true
      },
      '/apiShou':{
        target: 'http://pv.sohu.com/', // localhost=>target
        changeOrigin: true
      }
    }
  },
  build: {
    target: 'es2020'
  },
  optimizedeps: {
    esbuildoptions: {
      target: 'es2020'
    }
  },
})
