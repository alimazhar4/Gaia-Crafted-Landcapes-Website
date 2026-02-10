"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
	"/Caldicot/After2.JPG",
	"/Caldicot/After3.JPG",
	// "/Caldicot/After5.JPG",
	"/Caldicot/IMG_0652.JPG",
	"/Caldicot/IMG_0658.JPG",
	"/Caldicot/IMG_0664.JPG",
	"/Caldicot/IMG_0676.JPG",
	"/Caldicot/IMG_0679.JPG",
	"/Caldicot/IMG_0688.JPG",
	"/Catbrook/After4.JPG",
	"/Chepstow Finches Close/After2.JPG",
	"/Chepstow St Laurence Park/After2.JPG",
	"/Chepstow St Laurence Park/After4.JPG",
	"/Chepstow St Laurence Park/IMG_0796.JPG",
	"/Ross On Wye/After1.JPG",
	"/Coleford/After3.JPG",
	"/Llanmartin/After2.JPG",
	"/Llanwern/After1.JPG",
	"/Lydney/After1.JPG",
	"/Portskewett/After1.jpg",
	"/St Nicholas/After1.JPG",
	"/St Nicholas/IMG_1630.JPG",
	"/Thornbury/After2.JPG",
	"/Tutshill/AFter2.JPG",
	"/Abergavenny Bob & Carole/After3.JPG",
	"/Abergavenny Bob & Carole/IMG_9152.JPG",
];

const stats = [
	{
		value: "8",
		label: "Years experience",
		description: "Improving outdoor spaces with expert craftsmanship for years",
	},
	{
		value: "150",
		label: "Projects completed",
		description: "Over 150 successful projects delivered with quality and care",
	},
	{
		value: "10",
		label: "Skilled Tradespeople",
		description: "Our team of 10 experts ensures top-quality results",
	},
	{
		value: "100%",
		label: "Client satisfaction",
		description: "All of our clients are satisfied with our work and service",
	},
];

const qualifications = [
	"You want a garden that feels like a natural extension of your home",
	"You value considered design, quality materials, and attention to detail",
	"You're looking for a cohesive outdoor space, not a quick fix",
	"You want to work with people who listen, guide, and care about the outcome",
];

const QualificationSection = () => {
	return (
		<section
			id="qualification"
			className="py-16 sm:py-20 md:py-28 lg:py-36 bg-sage-light overflow-visible px-4 sm:px-6 md:px-0">
			{/* Qualification Header */}
			<div className="max-w-[1400px] mx-auto px-0 md:px-16 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-start">
					{/* Left column - 1/3 */}
					<div className="lg:col-span-1">
						<motion.div
							className="inline-flex items-center bg-plum text-white px-5 py-2 rounded-full mb-10 text-xs font-semibold tracking-[0.25em]"
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							viewport={{ once: true }}>
							Qualification
						</motion.div>
						<motion.h2
							className="font-display text-4xl md:text-5xl lg:text-[3.75rem] font-semibold leading-[1.08] tracking-tight text-plum"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							viewport={{ once: true }}>
							This may be
							<br />
							right for you if…
						</motion.h2>
					</div>

					{/* Right column - 2/3 */}
					<div className="lg:col-span-2 lg:pt-14 space-y-0">
						{qualifications.map((item, index) => (
							<motion.div
								key={index}
								className="flex items-start gap-5 py-3 border-b border-plum/25 last:border-b-0"
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
								viewport={{ once: true }}>
								<span className="flex-shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full bg-plum" />
								<p className="font-display text-lg md:text-xl lg:text-2xl text-plum leading-relaxed font-semibold">
									{item}
								</p>
							</motion.div>
						))}
						<motion.div
							className="pt-6 mt-2"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.9 }}
							viewport={{ once: true }}>
							<p className="text-sm md:text-base text-plum italic leading-relaxed font-light">
								We specialise in carefully planned, design-led landscape projects rather
								than high-volume work.
							</p>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Infinite scrolling image carousel - full width (full-bleed on mobile) */}
			<motion.div
				className="relative w-[100vw] max-w-none left-1/2 -translate-x-1/2 md:w-full md:left-0 md:translate-x-0 mb-16 sm:mb-20 md:mb-24 lg:mb-32 overflow-hidden"
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				viewport={{ once: true }}>
				<div className="flex w-max animate-scroll-left pl-4 sm:pl-6 md:pl-0">
					{images.map((img, index) => (
						<div
							key={`first-${index}`}
							className="relative flex-shrink-0 w-[260px] sm:w-[300px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[450px] mx-1.5 sm:mx-2 md:mx-3 rounded-2xl overflow-hidden shadow-lg shadow-black/10">
							<Image
								src={img}
								alt={`Landscape design project ${index + 1}`}
								fill
								className="object-cover hover:scale-105 transition-transform duration-700"
								loading="lazy"
							/>
						</div>
					))}
					{images.map((img, index) => (
						<div
							key={`second-${index}`}
							className="relative flex-shrink-0 w-[260px] sm:w-[300px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[450px] mx-1.5 sm:mx-2 md:mx-3 rounded-2xl overflow-hidden shadow-lg shadow-black/10">
							<Image
								src={img}
								alt={`Landscape design project ${index + 1}`}
								fill
								className="object-cover hover:scale-105 transition-transform duration-700"
								loading="lazy"
							/>
						</div>
					))}
				</div>
			</motion.div>

			{/* Stats */}
			<div className="max-w-[1400px] mx-auto px-0 md:px-16">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							className="space-y-2"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
							viewport={{ once: true }}>
							<span className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-gold">
								{stat.value}
							</span>
							<h3 className="text-base md:text-lg font-semibold text-plum uppercase tracking-wide">
								{stat.label}
							</h3>
							<p className="text-sm md:text-base text-plum leading-relaxed font-light">
								{stat.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default QualificationSection;
