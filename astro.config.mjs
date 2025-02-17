import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { loadEnv } from "vite";
import react from "@astrojs/react";
const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), react()],
  // Deployments
  site: env.PUBLIC_DOMAIN ? `https://${env.PUBLIC_DOMAIN}` : undefined,
  base: env.PUBLIC_BASE_URL || ""
});