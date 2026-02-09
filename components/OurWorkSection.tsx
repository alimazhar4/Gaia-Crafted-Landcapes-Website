import Link from "next/link";
import { ProjectsStackSection } from "@/components/ProjectsStackSection";
import type { Project } from "@/lib/projects";
import { projects } from "@/lib/projects";

const HOMEPAGE_PROJECT_IDS = [
	"caldicot-5",
	"st-nicholas-1",
	"caldicot-2",
] as const;

const OurWorkSection = () => {
	const homeProjects = HOMEPAGE_PROJECT_IDS.map((id) =>
		projects.find((p) => p.id === id),
	).filter((p): p is Project => !!p);

	return (
		<section id="work" className="bg-plum-dark overflow-visible px-4 sm:px-6 md:px-0">
			{/* Header */}
			<div className="py-12 sm:py-16 md:py-20 lg:py-28 text-center px-0 md:px-8">
				<div className="inline-flex items-center bg-gold text-white px-4 py-2 rounded-full mb-4 sm:mb-6">
					<span className="text-sm font-medium tracking-wide">Our work</span>
				</div>
				<h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white mb-4 sm:mb-6">
					Get inspired by our work
				</h2>
				<p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
					See how we&apos;ve transformed homes with our expert craftsmanship and
					attention to detail.
				</p>
			</div>

			<ProjectsStackSection projects={homeProjects} />

			{/* See more - after all cards */}
			<div
				className="relative flex justify-center py-8 sm:py-10 md:py-16 mt-[-100px]"
				style={{ zIndex: 50 }}>
				<Link
					href="/projects"
					className="bg-gold text-white px-8 sm:px-12 md:px-20 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg tracking-wide hover:bg-gold/90 transition-opacity cursor-pointer inline-block">
					See more
				</Link>
			</div>
		</section>
	);
};

export default OurWorkSection;
