import { headers } from "next/headers";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";

export const ProtectedRoutes = async ({
	children,
}: {
	children: ReactNode;
}) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return <p>not signed in</p>;
	}
	return children;
};
