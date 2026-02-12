import type { Metadata } from "next";
import Script from "next/script";
import { cormorantGaramond, inter } from "./fonts";
import "./globals.css";
import "lenis/dist/lenis.css";
import { Toaster } from "sonner";
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
			<head>
				{/* Google Tag Manager */}
				<Script
					id="gtm-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-59ZNFQ5M');
          `,
					}}
				/>

				{/* Meta Pixel */}
				<script
					dangerouslySetInnerHTML={{
						__html: `!function(f,b,e,v,n,t,s)
			{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
			n.callMethod.apply(n,arguments):n.queue.push(arguments)};
			if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
			n.queue=[];t=b.createElement(e);t.async=!0;
			t.src=v;s=b.getElementsByTagName(e)[0];
			s.parentNode.insertBefore(t,s)}(window, document,'script',
			'https://connect.facebook.net/en_US/fbevents.js');
			fbq('init', '878301171637536');
			fbq('track', 'PageView');`,
					}}
				/>
			</head>
			<body
				className={`${cormorantGaramond.variable} ${inter.variable} antialiased`}>
				{/* Meta Pixel noscript */}
				<noscript>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						height="1"
						width="1"
						style={{ display: "none" }}
						src="https://www.facebook.com/tr?id=878301171637536&ev=PageView&noscript=1"
						alt="Meta Pixel"
					/>
				</noscript>

				<SmoothScroll>{children}</SmoothScroll>
				<Toaster position="bottom-right" />
			</body>
		</html>
	);
}
