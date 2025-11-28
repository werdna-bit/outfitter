import type { user } from "@/db/schema";

export type RoleType = "admin" | "user";
export type T = typeof user.$inferSelect;
export type User = {
	id: string;
	email: string;
	name: string;
	username: string;
	role: RoleType;
	active: boolean;
	createdAt: string | Date;
	updatedAt: string | Date;
};
