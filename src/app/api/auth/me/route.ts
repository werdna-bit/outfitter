import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
	try {
		//GETTING THE USER SESSION
		const session = await auth.api.getSession({ headers: request.headers });

		if (!session?.user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}
		const user = session.user;
		return NextResponse.json({
			status: 500,
			user: user,
		});
	} catch (error) {}
}
