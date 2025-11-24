"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { ReactNode } from "react";
import { useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<div className="h-full w-full">
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</div>
	);
}
