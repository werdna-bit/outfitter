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

		try {
			console.log("Attempting to sign out..."); // Debug log

			const result = await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						console.log("Sign out successful - redirect to home"); // Debug log
						toast.success("Signed out successfully");
						router.push("/accounts/login");
					},
					onError: (context) => {
						console.error("Sign out fetch error:", context); // Debug log
						toast.error("Failed to sign out");
					},
				},
			});

			console.log("Sign out result:", result); // Debug log

			if (result?.error) {
				toast.error(`Sign out error: ${result.error.message || result.error}`);
				console.error("Sign out error:", result.error);
			}
		} catch (err) {
			console.error("Unexpected sign out error:", err);
			toast.error("An unexpected error occurred");
		} finally {
			setIsLoggingOut(false);
		}
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
