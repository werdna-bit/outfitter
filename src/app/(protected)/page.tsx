"use client";
import { createResetUrl } from "@/actions/useRedis";

export default function Home() {
	return (
		<p>
			Home
			<button
				onClick={createResetUrl}
				type="button"
				className="bg-blue-400 text-white"
			>
				Test
			</button>
		</p>
	);
}
