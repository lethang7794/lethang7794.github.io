import { env } from "@/env";

export function getLastUpdated(): string {
	return env.PUBLIC_TIME || new Date().toDateString();
}
