"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import Image from "next/image";

interface Pillar {
	id: string;
	title: string;
	description: string;
	image: string;
	icon: React.ReactNode;
}

const DesignIcon = () => (
	<svg
		width="28"
		height="28"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M12 2L2 7l10 5 10-5-10-5z" />
		<path d="M2 17l10 5 10-5" />
		<path d="M2 12l10 5 10-5" />
	</svg>
);

const CraftsmanshipIcon = () => (
	<svg
		width="28"
		height="28"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
	</svg>
);

const CommunicationIcon = () => (
	<svg
		width="28"
		height="28"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		<line x1="9" y1="10" x2="15" y2="10" />
	</svg>
);

const RespectIcon = () => (
	<svg
		width="28"
		height="28"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
		<polyline points="9 22 9 12 15 12 15 22" />
	</svg>
);

const pillars: Pillar[] = [
	{
		id: "design",
		title: "Design-Led Thinking",
		description:
			"Every garden is planned with intention, proportion, and flow, not templates.",
		image: "/Thornbury/IMG_1325.JPG",
		icon: <DesignIcon />,
	},
	{
		id: "craftsmanship",
		title: "Craftsmanship & Materials",
		description:
			"We work with quality materials chosen for longevity, appearance, and suitability.",
		image: "/gaia-garden-4.jpg",
		icon: <CraftsmanshipIcon />,
	},
	{
		id: "communication",
		title: "Clear Communication",
		description: "You'll know what's happening, when it's happening, and why.",
		image: "/gaia-garden-3.jpg",
		icon: <CommunicationIcon />,
	},
	{
		id: "respect",
		title: "Respect for Your Home",
		description:
			"We work carefully, keeping sites tidy and disruption to a minimum.",
		image: "/Caldicot/After4.JPG",
		icon: <RespectIcon />,
	},
];

const FALLBACK_IMAGE = "/Caldicot/After5.JPG";

const GaiaCraftedWaySection = () => {
	const [activePillar, setActivePillar] = useState<string>("design");

	return (
		<section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-sage-light px-4 sm:px-6 md:px-0">
			<div className="max-w-[1400px] mx-auto px-0 md:px-16">
				{/* Header */}
				<div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
					<span className="inline-flex items-center bg-plum text-white px-4 py-2 rounded-full mb-4 sm:mb-6 text-sm font-medium tracking-wide">
						The Gaia Crafted Way
					</span>
					<h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-plum mb-4 sm:mb-6">
						A considered approach from
						<br className="hidden md:block" /> concept to completion
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-plum/80 max-w-3xl mx-auto leading-relaxed">
						At Gaia Crafted Landscapes, every project begins with understanding.
						Your space, your home, and how you want to use your garden. We take
						a thoughtful, design-led approach to landscaping, carefully
						balancing structure, planting, and materials to create outdoor
						spaces that feel both purposeful and natural.
					</p>
				</div>

				{/* Content grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
					{/* Image with crossfade */}
					<div className="relative h-[320px] sm:h-[380px] md:h-[550px] lg:h-[650px] rounded-2xl overflow-hidden shadow-2xl">
						{/* Fallback image when accordion is closed */}
						<Image
							src={FALLBACK_IMAGE}
							alt="Gaia Crafted Landscapes"
							fill
							className={`object-cover transition-opacity duration-700 ease-in-out ${
								activePillar === "" ? "opacity-100 z-10" : "opacity-0 z-0"
							}`}
						/>
						{pillars.map((pillar) => (
							<Image
								key={pillar.id}
								src={pillar.image}
								alt={pillar.title}
								fill
								className={`object-cover transition-opacity duration-700 ease-in-out ${
									activePillar === pillar.id
										? "opacity-100 z-10"
										: "opacity-0 z-0"
								}`}
							/>
						))}
						{/* Subtle overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-plum/20 to-transparent z-20 pointer-events-none" />
					</div>

					{/* Accordion */}
					<div className="space-y-0">
						<p className="text-plum/70 mb-6 md:mb-8 text-sm sm:text-base leading-relaxed">
							From initial ideas through to final build, our focus is on
							craftsmanship, clarity, and creating gardens that stand the test
							of time.
						</p>
						{pillars.map((pillar) => (
							<div key={pillar.id} className="border-b border-plum/20">
								<button
									onClick={() =>
										setActivePillar(activePillar === pillar.id ? "" : pillar.id)
									}
									className="w-full flex items-center justify-between py-4 md:py-5 lg:py-6 text-left group cursor-pointer">
									<div className="flex items-center gap-3 sm:gap-4">
										<span className="text-plum transition-colors group-hover:text-gold flex-shrink-0">
											{pillar.icon}
										</span>
										<span className="font-display text-base sm:text-lg md:text-xl font-medium text-plum">
											{pillar.title}
										</span>
									</div>
									<span className="text-plum/60 group-hover:text-plum transition-colors flex-shrink-0">
										{activePillar === pillar.id ? (
											<X className="w-5 h-5" />
										) : (
											<Plus className="w-5 h-5" />
										)}
									</span>
								</button>

								<div
									className={`overflow-hidden transition-all duration-500 ease-in-out ${
										activePillar === pillar.id
											? "max-h-[300px] opacity-100 pb-4 md:pb-6"
											: "max-h-0 opacity-0"
									}`}>
									<p className="text-plum/70 leading-relaxed pl-8 sm:pl-10 md:pl-12 text-sm sm:text-base">
										{pillar.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default GaiaCraftedWaySection;
