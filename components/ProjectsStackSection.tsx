"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

const CARD_HEIGHT = 480;
const SCALE_STEP = 0.08;
const STACK_OFFSET = 0;

const ProjectCard = ({
	project,
	index,
	totalProjects,
}: {
	project: Project;
	index: number;
	totalProjects: number;
}) => {
	const isPlum = project.cardTheme === "plum";
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);

	useEffect(() => {
		const handleScroll = () => {
			if (!wrapperRef.current) return;
			const stickyTop = window.innerHeight / 2 - CARD_HEIGHT / 2;
			let cardsOnTop = 0;
			for (let i = index + 1; i < totalProjects; i++) {
				const nextWrapper = document.querySelector(
					`[data-card-index="${i}"]`,
				) as HTMLElement | null;
				if (nextWrapper) {
					const nextRect = nextWrapper.getBoundingClientRect();
					if (nextRect.top <= stickyTop + 20) cardsOnTop++;
				}
			}
			const newScale =
				cardsOnTop > 0 ? Math.max(0.75, 1 - cardsOnTop * SCALE_STEP) : 1;
			setScale(newScale);
		};
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [index, totalProjects]);

	const paddingTop = `${index * STACK_OFFSET}px`;
	const marginTop = index === 0 ? "0px" : `${-index * STACK_OFFSET}px`;

	return (
		<div
			ref={wrapperRef}
			data-card-index={index}
			className="sticky"
			style={{
				paddingTop,
				marginTop,
				top: `calc(50vh - ${CARD_HEIGHT / 2}px)`,
				zIndex: index + 1,
			}}>
			<div className="flex justify-center">
				<div
					className="w-full max-w-[1300px] will-change-transform"
					style={{
						transform: `scale(${scale})`,
						transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
						transformOrigin: "center top",
					}}>
					<div
						className={`rounded-3xl overflow-hidden shadow-2xl shadow-black/20 ${
							isPlum ? "bg-plum" : "bg-sage-light"
						}`}
						style={{
							height: `${CARD_HEIGHT}px`,
							marginBottom: `calc((100vh - ${CARD_HEIGHT}px) / 2)`,
						}}>
						<div className="grid grid-cols-1 md:grid-cols-2 h-full gap-4 p-4">
							<div
								className={`relative flex flex-col h-full rounded-2xl overflow-visible ${
									isPlum ? "" : "flex-col-reverse"
								}`}>
								<div
									className={`h-14 shrink-0 ${isPlum ? "bg-plum" : "bg-sage-light"}`}
								/>
								<div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl group">
									<Image
										src={project.imageBefore}
										alt={`${project.title} — Before`}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
								</div>
								<span
									className={`absolute left-5 inline-flex items-center px-10 py-4 rounded-full text-base font-semibold uppercase tracking-[0.15em] bg-charcoal/85 text-white backdrop-blur-md border border-white/10 z-10 pointer-events-none ${
										isPlum
											? "top-14 -translate-y-1/2"
											: "bottom-14 translate-y-1/2"
									}`}>
									Before
								</span>
							</div>
							<div
								className={`relative flex flex-col h-full rounded-2xl overflow-visible ${
									isPlum ? "flex-col-reverse" : ""
								}`}>
								<div
									className={`h-14 shrink-0 ${isPlum ? "bg-plum" : "bg-sage-light"}`}
								/>
								<div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl group">
									<Image
										src={project.imageAfter}
										alt={`${project.title} — After`}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
								</div>
								<span
									className={`absolute left-5 inline-flex items-center px-10 py-4 rounded-full text-base font-semibold uppercase tracking-[0.15em] bg-gold/80 text-white backdrop-blur-lg border border-gold/30 z-10 pointer-events-none ${
										isPlum
											? "bottom-14 translate-y-1/2"
											: "top-14 -translate-y-1/2"
									}`}>
									After
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

interface ProjectsStackSectionProps {
	projects: Project[];
}

export const ProjectsStackSection = ({ projects }: ProjectsStackSectionProps) => (
	<div className="px-4 md:px-8 overflow-visible">
		{projects.map((project, index) => (
			<ProjectCard
				key={project.id}
				project={project}
				index={index}
				totalProjects={projects.length}
			/>
		))}
	</div>
);
