"use client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export const Logout = () => {
	const router = useRouter();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogOut = async () => {
		if (isLoggingOut) return; // Prevent double-click

		setIsLoggingOut(true);

		// Optimistic update
		router.push("/accounts/login");
		toast.success("Signed out successfully");

		// Background cleanup
		authClient.signOut().catch((err) => {
			console.error("Sign out error:", err);
		});
	};

	return (
		<button
			type="button"
			onClick={handleLogOut}
			disabled={isLoggingOut}
			aria-label="Log out"
			className="flex items-center gap-2 disabled:opacity-50"
		>
			<LogOutIcon className="w-5 h-5" />
		</button>
	);
};
