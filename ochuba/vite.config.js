import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_BASE_URL': JSON.stringify('http://localhost:5000'),
  },
  esbuild: {
    jsxFactory: 'h', // Specify your JSX factory, if needed
  },
})
