import { Redis } from "@upstash/redis";

console.log("URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log(
	"Token:",
	process.env.UPSTASH_REDIS_REST_TOKEN ? "exists" : "missing",
);
export const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
