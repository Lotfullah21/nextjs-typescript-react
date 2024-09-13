import React from "react";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inconsolata } from "next/font/google";
import type { Metadata } from "next";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "nextjs",
	description: "a completer tutorial",
	keywords: "nextjs",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body className={inconsolata.className}>
				<Navbar></Navbar>
				<main className="max-w-7xl mx-auto"> {children}</main>
			</body>
		</html>
	);
}
