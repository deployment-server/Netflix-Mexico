import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');

  // Access environment variables from either process.env (Vercel) or .env files (Local)
  const processEnv = { ...process.env, ...env };

  // Map Vercel environment variables to the App's expected keys
  const apiKey = processEnv.API_KEY || processEnv.google_ai_key || '';
  const supabaseUrl = processEnv.NEXT_PUBLIC_SUPABASE_URL || processEnv.supabase_url || '';
  const supabaseKey = processEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || processEnv.supabase_key || '';

  return {
    plugins: [react()],
    define: {
      // Polyfill process.env for existing code compatibility
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY': JSON.stringify(supabaseKey),
      'process.env': JSON.stringify({})
    }
  };
});