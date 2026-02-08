"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { ENQUIRY_SECTION_ID } from "@/lib/scroll-targets";

const ctaGardenBg = "/Caldicot/IMG_0664.JPG";

const FinalCTASection = () => {
	const lenis = useLenis();

	const scrollToEnquiry = () => {
		const el = document.getElementById(ENQUIRY_SECTION_ID);
		if (el) lenis?.scrollTo(el, { offset: 0 });
	};

	return (
		<section className="relative flex items-center overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src={ctaGardenBg}
					alt="Beautiful garden landscape"
					fill
					className="object-cover"
					sizes="100vw"
					priority
				/>
			</div>

			{/* Sage-light gradient: left to right (sage-light on left, transparent on right) */}
			<div className="absolute inset-0 z-10 bg-gradient-to-r from-sage-light via-sage-light/90 to-transparent" />

			{/* Content - left-aligned within site width */}
			<div className="relative z-20 w-full max-w-[1400px] mx-auto px-8 md:px-16 py-16 md:py-20 text-left">
				{/* Heading */}
				<h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-plum mb-6 drop-shadow-lg max-w-2xl">
					Ready to explore what your garden could become?
				</h2>

				{/* Supporting Line */}
				<p className="text-lg md:text-xl text-plum leading-relaxed mb-10 max-w-xl">
					If you&apos;re considering a thoughtfully designed outdoor space and
					would like to discuss your ideas, we&apos;d be happy to talk.
				</p>

				{/* CTA Button */}
				<button
					type="button"
					onClick={scrollToEnquiry}
					className="group inline-flex items-center gap-3 bg-plum hover:bg-plum-dark text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
					<span>Start Your Garden Enquiry</span>
					<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
				</button>
			</div>
		</section>
	);
};

export default FinalCTASection;
