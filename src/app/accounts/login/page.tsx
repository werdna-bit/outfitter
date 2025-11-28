"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "@/components/ui/LoginForm";
import { authClient } from "@/lib/auth-client";

export default function Page() {
	const [isLogged, setIsLogged] = useState<boolean | null>(null);
	const router = useRouter();

	useEffect(() => {
		async function checkSession() {
			const { data: session } = await authClient.getSession();
			setIsLogged(!!session?.user);
		}
		checkSession();
	}, []);

	useEffect(() => {
		if (isLogged) {
			router.push("/");
		}
	}, [isLogged, router]);

	if (isLogged) return null;

	return (
		<div className="w-full h-full">
			<LoginForm />
		</div>
	);
}
