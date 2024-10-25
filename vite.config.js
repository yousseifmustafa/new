import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
 


  server: {
    https: false,  // Ensure that this is set to false (or just remove this line)
    host: true,    // To make sure Vite can be accessed by IP (optional)
    port: 3000     // Optional: Define the port for the dev server
  }
});

