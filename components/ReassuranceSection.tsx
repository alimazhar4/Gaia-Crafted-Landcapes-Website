"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useLenis } from "lenis/react";
import { ENQUIRY_SECTION_ID } from "@/lib/scroll-targets";

const reassuranceConsultation = "/Caldicot/IMG_0688.JPG";
const reassurancePlanning = "/Caldicot/After4.JPG";
const reassuranceSketch = "/Caldicot/After2.JPG";

const expectations = [
	{
		title: "A considered conversation",
		description:
			"About your ideas, lifestyle, how you envision using your outdoor space",
	},
	{
		title: "Honest guidance",
		description:
			"On what will work best for your garden, budget, and timeframe",
	},
	{
		title: "Clear next steps",
		description: "If the project feels like a good fit for both of us",
	},
	{
		title: "No obligation",
		description: "And no pushy sales process—just genuine, helpful advice",
	},
];

const ReassuranceSection = () => {
	const lenis = useLenis();

	const scrollToEnquiry = () => {
		const el = document.getElementById(ENQUIRY_SECTION_ID);
		if (el) lenis?.scrollTo(el, { offset: 0 });
	};

	return (
		<section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-sage-light px-4 sm:px-6 md:px-0">
			<div className="max-w-[1400px] mx-auto px-0 md:px-16">
				{/* Main grid layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center">
					{/* Left side - Content */}
					<div className="order-2 lg:order-1">
						{/* Header */}
						<div className="mb-8 sm:mb-10 md:mb-12">
							<div className="mb-4 sm:mb-6 md:mb-8">
								<span className="inline-flex items-center bg-plum text-white px-4 py-2 rounded-full text-sm font-medium tracking-wide">
									Getting Started
								</span>
							</div>

							<h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight text-plum mb-5 sm:mb-6 md:mb-8">
								What to <span className="text-plum/50">expect</span>
							</h2>
						</div>

						{/* Expectations list */}
						<div className="space-y-3 sm:space-y-4">
							{expectations.map((item, index) => (
								<div
									key={index}
									className="group flex gap-3 sm:gap-5 p-4 sm:p-5 bg-white/50 backdrop-blur-sm rounded-xl border border-sage/20 hover:bg-white hover:shadow-lg hover:border-sage/40 transition-all duration-300 cursor-default">
									{/* Number indicator */}
									<div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-plum flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
										<Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
									</div>

									{/* Content */}
									<div className="flex-1 min-w-0">
										<h3 className="font-display text-lg sm:text-xl font-semibold text-plum mb-1 group-hover:text-plum-dark transition-colors">
											{item.title}
										</h3>
										<p className="text-plum/60 text-xs sm:text-sm leading-relaxed">
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* CTA */}
						<div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
							<button
								type="button"
								onClick={scrollToEnquiry}
								className="group inline-flex items-center gap-2 sm:gap-3 bg-plum text-white px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-plum-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:gap-4 cursor-pointer text-sm sm:text-base">
								Start the conversation
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="transition-transform group-hover:translate-x-1">
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</button>
							<span className="text-plum/40 text-xs sm:text-sm self-start sm:self-center italic">
								Response within 24 hours
							</span>
						</div>
					</div>

					{/* Right side - Images */}
					<div className="order-1 lg:order-2 relative">
						{/* Main large image */}
						<div className="relative z-10 h-[280px] sm:h-[340px] md:h-[550px] lg:h-[620px] rounded-2xl overflow-hidden shadow-2xl">
							<Image
								src={reassuranceConsultation}
								alt="Garden consultation"
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
							{/* Subtle overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-plum/15 via-transparent to-transparent pointer-events-none" />
						</div>

						{/* Small image - Top left corner */}
						<div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 md:-top-8 md:-left-8 w-[100px] sm:w-[140px] md:w-[180px] h-[72px] sm:h-[100px] md:h-[130px] z-20 rounded-xl overflow-hidden shadow-xl border-2 sm:border-4 border-sage-light rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
							<Image
								src={reassuranceSketch}
								alt="Garden sketching"
								fill
								className="object-cover"
								sizes="180px"
							/>
						</div>

						{/* Small image - Bottom right corner */}
						<div className="absolute -bottom-4 -right-3 sm:-bottom-6 sm:-right-4 md:-bottom-8 md:-right-6 w-[120px] sm:w-[160px] md:w-[200px] h-[90px] sm:h-[120px] md:h-[150px] z-20 rounded-xl overflow-hidden shadow-xl border-2 sm:border-4 border-sage-light rotate-[3deg] hover:rotate-0 transition-transform duration-500">
							<Image
								src={reassurancePlanning}
								alt="Garden planning"
								fill
								className="object-cover"
								sizes="200px"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ReassuranceSection;
