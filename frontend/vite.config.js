import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: { host: true, port: 5173, strictPort: true },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/__tests__/setup.js'
    }
})
