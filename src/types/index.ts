type RoleType = ["admin", "user"];

export type User = {
	id: string;
	email: string;
	name: string;
	username: string;
	role: RoleType;
	active: true;
	createdAt: string;
	updatedAt: string;
};
