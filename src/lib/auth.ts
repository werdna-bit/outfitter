import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { db } from "../db"; // your drizzle instance
import { schema } from "../db/schema";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite"
		schema,
	}),
	// Add this to include custom fields in the session
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},
	user: {
		additionalFields: {
			username: {
				type: "string",
				required: false,
			},
			displayUsername: {
				type: "string",
				required: false,
			},
			active: {
				type: "boolean",
				required: false,
			},
			role: {
				type: "string",
				enum: ["user", "admin"],
				required: false,
			},
		},
	},
	plugins: [username(), nextCookies()],
});
