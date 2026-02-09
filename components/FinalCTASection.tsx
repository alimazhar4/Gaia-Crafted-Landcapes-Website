"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { ENQUIRY_SECTION_ID } from "@/lib/scroll-targets";

const ctaGardenBg = "/Caldicot/IMG_0664.JPG";

const FinalCTASection = () => {
	const lenis = useLenis();

	const scrollToEnquiry = () => {
		const el = document.getElementById(ENQUIRY_SECTION_ID);
		if (el) lenis?.scrollTo(el, { offset: 0 });
	};

	return (
		<section className="relative flex items-center overflow-hidden px-4 sm:px-6 md:px-0">
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
			<div className="relative z-20 w-full max-w-[1400px] mx-auto px-0 md:px-16 py-12 sm:py-14 md:py-16 lg:py-20 text-left">
				{/* Heading */}
				<motion.h2
					className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-plum mb-4 sm:mb-6 drop-shadow-lg max-w-2xl"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.56, delay: 0.05 }}
					viewport={{ once: true }}>
					Ready to explore what your garden could become?
				</motion.h2>

				{/* Supporting Line */}
				<motion.p
					className="text-base sm:text-lg md:text-xl text-plum leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-xl"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.48, delay: 0.15 }}
					viewport={{ once: true }}>
					If you&apos;re considering a thoughtfully designed outdoor space and would
					like to discuss your ideas, we&apos;d be happy to talk.
				</motion.p>

				{/* CTA Button */}
				<motion.button
					type="button"
					onClick={scrollToEnquiry}
					className="group inline-flex items-center gap-2 sm:gap-3 bg-plum hover:bg-plum-dark text-white px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.48, delay: 0.25 }}
					viewport={{ once: true }}>
					<span>Start Your Garden Enquiry</span>
					<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
				</motion.button>
			</div>
		</section>
	);
};

export default FinalCTASection;
