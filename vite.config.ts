import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {viteStaticCopy} from "vite-plugin-static-copy"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/local_python/",
  plugins: [react(), viteStaticCopy({
    targets: [
      {
        src: "node_modules/pyodide/*.*",
        dest: "./pyodide"
      }
    ]
  })],
  optimizeDeps: {
    exclude: ["pyodide"]
  },
  resolve: {
    alias: {
      "node-fetch": "isomorphic-fetch"
    }
  }
})
