function withOpacity(variableName) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `hsla(var(${variableName}), ${opacityValue})`;
		}
		return `hsl(var(${variableName}))`;
	};
}

export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			textColor: {
				skin: {
					base: withOpacity("--color-text"),
					muted: withOpacity("--color-text-secondary"),
					inverted: withOpacity("--color-text-inverse"),
				},
			},
			backgroundColor: {
				skin: {
					fill: withOpacity("--color-fill"),
					"button-accent": withOpacity("--color-bg"),
					"button-muted": withOpacity("--color-bg-inverse"),
				},
			},
			colors: {
				skin: {
					hue: withOpacity("--color-main"),
					muted: withOpacity("--color-text-secondary"),
				},
			},
			ringColor: {
				skin: {
					fill: withOpacity("--color-fill"),
				},
			},
			gradientColorStops: {
				skin: {
					hue: withOpacity("--color-fill"),
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/container-queries")],
};
