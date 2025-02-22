import type { DarkModeTheme } from "@/types";

export const THEMES = {
	light: "light",
	dark: "dark",
	system: "system",
} as const;

export const DEFAULT_THEME: DarkModeTheme = "light";
