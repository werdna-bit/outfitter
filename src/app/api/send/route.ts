import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createResetUrl } from "@/actions/useRedis";
import PasswordResetEmail from "@/components/emails/PasswordResetEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get("email");
	const username = searchParams.get("username");
	const id = searchParams.get("id");

	if (!email || !username || !id) {
		return NextResponse.json(
			{ error: "Email or username required" },
			{ status: 400 },
		);
	}
	const result = await createResetUrl({
		email: email,
		id: id,
		username: username,
	});
	if (result.error) {
		return NextResponse.json(
			{
				error: result.error,
			},
			{ status: 400 },
		);
	}

	if (!result.url) {
		return NextResponse.json(
			{ error: "Failed to generate reset url" },
			{ status: 404 },
		);
	}

	try {
		const { data, error } = await resend.emails.send({
			from: "Outfira <security@outfira.werdnadev.com>",
			to: [email],
			subject: "Password Reset Request",
			react: PasswordResetEmail({
				userEmail: email,
				expiryTime: "24",
				resetUrl: result.url,
				userName: username,
			}),
		});

		if (error) {
			console.error("Resend API error:", error);
			return NextResponse.json(
				{ error: error.message || "Failed to send email" },
				{ status: 500 },
			);
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
			},
			{ status: 500 },
		);
	}
}
