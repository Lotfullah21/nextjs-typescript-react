import React from "react";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter, Inconsolata } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
const inconsolata = Inconsolata({ subsets: ["latin"] });

export const metaData: Metadata = {
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
