"use client";

import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

function ScrollToTopOnRouteChange() {
	const pathname = usePathname();
	const lenis = useLenis();

	useEffect(() => {
		lenis?.scrollTo(0, { immediate: true });
	}, [pathname, lenis]);

	return null;
}

export default function SmoothScroll({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ReactLenis
			root
			options={{
				lerp: 0.05,
				duration: 1.8,
				smoothWheel: true,
			}}
		>
			<ScrollToTopOnRouteChange />
			{children}
		</ReactLenis>
	);
}
