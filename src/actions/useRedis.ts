"use server";
import * as crypto from "crypto";
import { redis } from "@/lib/redis";

export async function createResetUrl({
	email,
	id,
	username,
}: {
	email: string;
	id: string;
	username: string;
}) {
	try {
		if (!email || !username || !id) {
			return { error: "Email, username and id required " };
		}

		const rateLimitKey = `reset-request:${email}`;

		// Atomic: only sets if key doesn't exist
		const result = await redis.set(rateLimitKey, "1", {
			ex: 300,
			nx: true,
		});

		if (!result) {
			return { error: "Please wait 5 minutes before requesting another reset" };
		}

		const token = crypto.randomBytes(32).toString("hex");

		await redis.set(`reset:${token}`, JSON.stringify({ id, email, username }), {
			ex: 86400,
		});

		const url = `${process.env.NEXT_PUBLIC_APP_URL}/accounts/password/reset/confirm?uid=${id}&token=${token}`;

		return { success: true, url };
	} catch (error) {
		const e = error as Error;
		throw new Error(e.message || "An unknown error occured");
	}
}
