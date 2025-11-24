import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
	title: "Outfira",
	description: "a fashion social media site/app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased ${inter.className}`}>
				<Providers>{children}</Providers>
				<Toaster />
			</body>
		</html>
	);
}
