export const env = {
	PUBLIC_DOMAIN: import.meta.env.PUBLIC_DOMAIN || "",
	PUBLIC_BASE_PATH: import.meta.env.PUBLIC_BASE_PATH || "",
	PUBLIC_TIME: import.meta.env.PUBLIC_TIME || "",
	PUBLIC_GA_ID: import.meta.env.PUBLIC_GA_ID || "",
} as const;
