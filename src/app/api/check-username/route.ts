import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { user } from "@/db/schema";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const username = searchParams.get("username");

	if (!username) {
		return NextResponse.json({ error: "Username required" }, { status: 400 });
	}

	console.log(username);

	// Check Redis/DB here
	const userExists = await db
		.select({ count: count() })
		.from(user)
		.where(eq(user.username, username.toLowerCase()));

	return NextResponse.json({
		available: userExists[0].count === 0,
	});
}
