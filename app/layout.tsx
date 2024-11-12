import "./globals.css";
import Navbar from "../components/Navbar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Hooshmanlab project",
	description: "A Next.js project implemented in ts, tailwind",
	keywords: "Next.js Typescript, TailwindCSS",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar></Navbar>
				<main className="mx-auto max-w-3xl px-2">{children}</main>
			</body>
		</html>
	);
}
