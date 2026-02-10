import type { Metadata } from "next";
import { cormorantGaramond, inter } from "./fonts";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
	title: "Gaia Crafted Landscapes",
	description:
		"Bespoke landscape design and build across South Wales. Thoughtfully designed gardens, crafted to last.",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="lenis lenis-smooth">
			<body
				className={`${cormorantGaramond.variable} ${inter.variable} antialiased`}>
				<SmoothScroll>{children}</SmoothScroll>
			</body>
		</html>
	);
}
