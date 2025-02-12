import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), icon()],

	// Deployments
	site: import.meta.env.PUBLIC_DOMAIN
		? `https://${import.meta.env.PUBLIC_DOMAIN}`
		: undefined,
	base: import.meta.env.PUBLIC_BASE_URL,
});
