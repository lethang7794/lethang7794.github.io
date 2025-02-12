import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), icon()],

	// Deployments
	site: import.meta.env.DOMAIN
		? `https://${import.meta.env.DOMAIN}`
		: undefined,
	base: import.meta.env.BASE_URL,
});
