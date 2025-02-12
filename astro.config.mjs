import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), icon()],

	// Deployments
	site: process.env.PUBLIC_DOMAIN
		? `https://${process.env.PUBLIC_DOMAIN}`
		: undefined,
	base: process.env.PUBLIC_BASE_URL || "",
});
