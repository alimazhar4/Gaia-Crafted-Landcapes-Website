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
		<section className="py-24 md:py-32 bg-sage-light">
			<div className="max-w-[1400px] mx-auto px-8 md:px-16">
				{/* Main grid layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* Left side - Content */}
					<div className="order-2 lg:order-1">
						{/* Header */}
						<div className="mb-12">
							<div className="mb-8">
								<span className="inline-flex items-center bg-plum text-white px-4 py-2 rounded-full text-sm font-medium tracking-wide">
									Getting Started
								</span>
							</div>

							<h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-plum mb-8">
								What to <span className="text-plum/50">expect</span>
							</h2>
						</div>

						{/* Expectations list */}
						<div className="space-y-4">
							{expectations.map((item, index) => (
								<div
									key={index}
									className="group flex gap-5 p-5 bg-white/50 backdrop-blur-sm rounded-xl border border-sage/20 hover:bg-white hover:shadow-lg hover:border-sage/40 transition-all duration-300 cursor-default">
									{/* Number indicator */}
									<div className="flex-shrink-0 w-12 h-12 rounded-full bg-plum flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
										<Check className="w-5 h-5 text-white" strokeWidth={2.5} />
									</div>

									{/* Content */}
									<div className="flex-1 min-w-0">
										<h3 className="font-display text-xl font-semibold text-plum mb-1 group-hover:text-plum-dark transition-colors">
											{item.title}
										</h3>
										<p className="text-plum/60 text-sm leading-relaxed">
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* CTA */}
						<div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
							<button
								type="button"
								onClick={scrollToEnquiry}
								className="group inline-flex items-center gap-3 bg-plum text-white px-8 py-4 rounded-full font-medium hover:bg-plum-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:gap-4 cursor-pointer">
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
							<span className="text-plum/40 text-sm self-center italic">
								Response within 24 hours
							</span>
						</div>
					</div>

					{/* Right side - Images */}
					<div className="order-1 lg:order-2 relative">
						{/* Main large image */}
						<div className="relative z-10 h-[450px] md:h-[550px] lg:h-[620px] rounded-2xl overflow-hidden shadow-2xl">
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
						<div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 w-[140px] md:w-[180px] z-20 rounded-xl overflow-hidden shadow-xl border-4 border-sage-light rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
							<img
								src={reassuranceSketch}
								alt="Garden sketching"
								className="w-full h-[100px] md:h-[130px] object-cover"
							/>
						</div>

						{/* Small image - Bottom right corner */}
						<div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 w-[160px] md:w-[200px] z-20 rounded-xl overflow-hidden shadow-xl border-4 border-sage-light rotate-[3deg] hover:rotate-0 transition-transform duration-500">
							<img
								src={reassurancePlanning}
								alt="Garden planning"
								className="w-full h-[120px] md:h-[150px] object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ReassuranceSection;
