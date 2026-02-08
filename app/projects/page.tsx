import Link from "next/link";
import { ProjectsStackSection } from "@/components/ProjectsStackSection";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
	return (
		<main className="min-h-screen bg-plum-dark overflow-visible">
			{/* Back to home - fixed top left */}
			<Link
				href="/"
				className="fixed top-6 left-6 z-50 bg-gold text-white px-6 py-3 rounded-full font-semibold text-base tracking-wide hover:bg-gold/90 transition-opacity cursor-pointer inline-block">
				Back to home
			</Link>

			{/* Header */}
			<div className="py-12 md:py-16 text-center px-8">
				<div className="inline-flex items-center bg-gold text-white px-4 py-2 rounded-full mb-6">
					<span className="text-sm font-medium tracking-wide">Our work</span>
				</div>
				<h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white mb-6">
					All projects
				</h1>
				<p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
					See how we&apos;ve transformed homes with our expert craftsmanship and
					attention to detail.
				</p>
			</div>

			<ProjectsStackSection projects={projects} />
		</main>
	);
}
