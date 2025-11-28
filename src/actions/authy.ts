"use server";

import { getSession } from "@/helpers/getSession";

export async function getSessionAction() {
	return await getSession();
}
