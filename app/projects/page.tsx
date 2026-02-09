"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectsStackSection } from "@/components/ProjectsStackSection";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
	return (
		<main className="min-h-screen bg-plum-dark overflow-visible px-4 sm:px-6 md:px-0">
			{/* Back to home - fixed top left */}
			<Link
				href="/"
				className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 bg-gold text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base tracking-wide hover:bg-gold/90 transition-opacity cursor-pointer inline-block">
				Back to home
			</Link>

			{/* Header - extra top margin on mobile for spacing below back button */}
			<div className="pt-24 sm:pt-20 md:pt-12 lg:pt-16 pb-8 sm:pb-10 md:py-12 md:pb-16 text-center px-0 md:px-8">
				<motion.div
					className="inline-flex items-center bg-gold text-white px-4 py-2 rounded-full mb-4 sm:mb-6"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.05 }}
					viewport={{ once: true }}>
					<span className="text-sm font-medium tracking-wide">Our work</span>
				</motion.div>
				<motion.h1
					className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white mb-4 sm:mb-6"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.48, delay: 0.1 }}
					viewport={{ once: true }}>
					All projects
				</motion.h1>
				<motion.p
					className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.48, delay: 0.15 }}
					viewport={{ once: true }}>
					See how we&apos;ve transformed homes with our expert craftsmanship and
					attention to detail.
				</motion.p>
			</div>

			<ProjectsStackSection projects={projects} />
		</main>
	);
}
