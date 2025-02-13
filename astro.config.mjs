import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), icon()],

	// Deployments
	site: env.PUBLIC_DOMAIN ? `https://${env.PUBLIC_DOMAIN}` : undefined,
	base: env.PUBLIC_BASE_URL || "",
});
