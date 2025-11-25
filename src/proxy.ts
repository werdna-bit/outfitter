import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return NextResponse.redirect(new URL("/accounts/login", request.url));
	}

	return NextResponse.next();
}
export const config = {
	matcher: [
		"/((?!accounts|api/auth|api/check-username|_next/static|_next/image|favicon.ico).*)",
	],
};
