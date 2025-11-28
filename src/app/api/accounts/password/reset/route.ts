import { NextResponse } from "next/server";

export async function GET(request: Request) {
	console.log("hit");
	return NextResponse.json("Hit");
}
