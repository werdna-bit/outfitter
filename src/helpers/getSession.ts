import { auth } from "@/lib/auth";
import type { RoleType, User } from "@/types"; // Adjust import path as needed

export async function getSession(): Promise<User | null> {
	const session = await auth.api.getSession({
		headers: {
			cookie: "", // Better Auth will handle this
		},
	});

	if (session?.user) {
		// Ensure all required fields are present and non-null
		if (!session.user.username || !session.user.name || !session.user.role) {
			return null; // Return null if required fields are missing
		}

		return {
			id: session.user.id,
			email: session.user.email,
			username: session.user.username,
			active: session.user.active ?? true,
			role: session.user.role as RoleType,
			name: session.user.name,
			createdAt: session.user.createdAt,
			updatedAt: session.user.updatedAt,
		};
	}
	return null;
}
