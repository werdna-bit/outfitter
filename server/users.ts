"use server";
import { z } from "zod";
import { auth } from "../src/lib/auth";

const emailSchema = z.email();

export const signIn = async (usernameOrEmail: string, password: string) => {
	try {
		// Try email login first
		const emailResult = emailSchema.safeParse(usernameOrEmail);

		if (emailResult.success) {
			await auth.api.signInEmail({
				body: {
					email: usernameOrEmail,
					password,
				},
			});
			return {
				success: true,
				message: "Signed in successfully",
			};
		}

		// Otherwise try username login
		await auth.api.signInUsername({
			body: {
				username: usernameOrEmail,
				password,
			},
		});

		return {
			success: true,
			message: "Signed in successfully",
		};
	} catch (error) {
		const e = error as Error;

		throw new Error(e.message || "An unknown error occured");
	}
};

export const signUp = async ({
	email,
	password,
	name,
	username,
}: {
	email: string;
	password: string;
	name: string;
	username: string;
}) => {
	await auth.api.signUpEmail({
		body: {
			email,
			password,
			name,
			username,
			displayUsername: username.toLowerCase(),
		},
	});
	return {
		success: true,
		message: "Succesfully create user account",
	};
};
