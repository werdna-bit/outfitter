import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { user } from "@/db/schema";

const emailSchema = z.email();

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const input = searchParams.get("input");

	if (!input) {
		return NextResponse.json(
			{ error: "Username or email required" },
			{ status: 400 },
		);
	}
	console.log(input);

	const emailResult = emailSchema.safeParse(input);
	const column = emailResult.success ? user.email : user.username;

	const [existingUser] = await db
		.select()
		.from(user)
		.where(eq(column, input.toLowerCase()));

	return NextResponse.json({
		available: !existingUser,
		email: existingUser.email,
		username: existingUser.username,
		id: existingUser.id,
	});
}
