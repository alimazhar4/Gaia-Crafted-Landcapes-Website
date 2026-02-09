"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
	{
		id: 1,
		name: "Sarah Stylianou",
		location: "Chepstow, Monmouthshire",
		quote:
			"Great company, Richy has amazing ideas for garden designs very professional and would definitely recommend to anyone interested.",
		variant: "white" as const,
	},
	{
		id: 2,
		name: "Robert",
		location: "Caldicot, Newport",
		quote:
			"Richie is a very hardworking and skilled landscaper. He transformed our garden. We can highly recommend him.",
		variant: "white" as const,
	},
	{
		id: 3,
		name: "James & Emma T.",
		location: "Richmond, Surrey",
		quote:
			"From the first consultation to the final plant, everything was handled with care. Our outdoor space has become our favorite room.",
		variant: "sage" as const,
	},
	{
		id: 4,
		name: "Michael Edwards",
		location: "Kensington, London",
		quote:
			"The design-led approach really sets Gaia Crafted apart. They created a space that feels both timeless and perfectly suited to how we live.",
		variant: "charcoal" as const,
	},
	{
		id: 5,
		name: "Sophie Baron",
		location: "Abergavenny, Gwent",
		quote: "Great company. Friendly and professional service.",
		variant: "sage" as const,
	},
];

// All available images
const gardenImages = [
	{ src: "/Caldicot/After5.JPG", alt: "Beautiful garden pathway" },
	{ src: "/Chepstow Finches Close/After2.JPG", alt: "Modern garden room" },
	{ src: "/Caldicot/After1.JPG", alt: "Elegant pergola" },
	{ src: "/St Arvans/After1.JPG", alt: "Stylish garden seating area" },
	{ src: "/Llanmartin/After2.JPG", alt: "Contemporary garden design" },
	{ src: "/Usk/After1.JPG", alt: "Garden transformation" },
	{ src: "/Ross On Wye/After4.JPG", alt: "Landscaped garden" },
	{ src: "/Thornbury/After2.JPG", alt: "Outdoor living space" },
];

// Define card types
type ReviewCard = {
	type: "review";
	id: string;
	data: (typeof reviews)[0];
	width: string;
};

type ImageCard = {
	type: "image";
	id: string;
	data: { src: string; alt: string };
	width: string;
};

type Card = ReviewCard | ImageCard;

// Create card pool - mix of reviews and images
const createCardPool = (): Card[] => {
	const pool: Card[] = [];

	// Add review cards (indices 0-4)
	reviews.forEach((review, idx) => {
		pool.push({
			type: "review" as const,
			id: `review-${review.id}`,
			data: review,
			width: idx % 3 === 0 ? "w-[340px]" : "w-[380px]",
		});
	});

	// Add image cards (indices 5-12)
	gardenImages.forEach((img, idx) => {
		pool.push({
			type: "image" as const,
			id: `image-${idx}`,
			data: img,
			width: idx % 2 === 0 ? "w-[420px]" : "w-[360px]",
		});
	});

	return pool;
};

const ROW1_SLIDE_DURATION = 60;
const ROW2_SLIDE_DURATION = 80;
const ROW3_SLIDE_DURATION = 70;

// Review card component
const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => {
	const bgColor =
		review.variant === "white"
			? "bg-white"
			: review.variant === "sage"
				? "bg-sage-light"
				: "bg-charcoal";
	const textColor =
		review.variant === "charcoal" ? "text-white/80" : "text-plum/80";
	const nameColor = review.variant === "charcoal" ? "text-white" : "text-plum";
	const locationColor =
		review.variant === "charcoal" ? "text-white/50" : "text-plum/50";
	const quoteColor =
		review.variant === "white"
			? "text-sage"
			: review.variant === "sage"
				? "text-plum/30"
				: "text-white/20";

	return (
		<div
			className={`${bgColor} rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between h-[220px] md:h-[260px] border-2 border-white/40 shrink-0`}>
			<div>
				<div className="flex gap-0.5 mb-2 sm:mb-3">
					{[1, 2, 3, 4, 5].map((i) => (
						<Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold text-gold" />
					))}
				</div>
				<p className={`${textColor} leading-relaxed text-xs sm:text-sm`}>
					&quot;{review.quote}&quot;
				</p>
			</div>
			<div className="flex items-center justify-between">
				<div>
					<p className={`font-medium ${nameColor} text-xs sm:text-sm`}>
						{review.name}
					</p>
					{review.location && (
						<p className={`${locationColor} text-xs`}>{review.location}</p>
					)}
				</div>
				<Quote className={`w-5 h-5 sm:w-6 sm:h-6 ${quoteColor}`} />
			</div>
		</div>
	);
};

// Image card component
const ImageCard = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="relative rounded-2xl overflow-hidden h-[220px] md:h-[260px] shrink-0">
			<Image
				src={src}
				alt={alt}
				fill
				className="object-cover hover:scale-105 transition-transform duration-500"
			/>
		</div>
	);
};

const MovingReviewSection = () => {
	const pool = createCardPool();

	// Distribute cards across rows (circular pattern)
	const row1Cards = [
		pool[0], // review
		pool[5], // image
		pool[1], // review
		pool[6], // image
		pool[2], // review
		pool[7], // image
	];

	const row2Cards = [
		pool[8], // image
		pool[3], // review
		pool[9], // image
		pool[4], // review
		pool[0], // review (loop back)
	];

	const row3Cards = [
		pool[10], // image
		pool[1], // review
		pool[6], // image
		pool[3], // review
		pool[7], // image
	];

	return (
		<section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-plum-dark overflow-hidden">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16">
				{/* Header */}
				<div className="mb-10 sm:mb-12 md:mb-16 lg:mb-20">
					<motion.div
						className="inline-flex items-center bg-gold text-white px-4 py-2 rounded-full mb-4 sm:mb-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.48, delay: 0.05 }}
						viewport={{ once: true }}>
						<span className="text-sm font-medium tracking-wide">Client Reviews</span>
					</motion.div>
					<motion.h2
						className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.48, delay: 0.1 }}
						viewport={{ once: true }}>
						Gardens crafted with care,
						<br />
						<span className="text-white/80">stories told by our clients</span>
					</motion.h2>
				</div>
			</div>

			{/* Scrolling Rows - Full Width */}
			<div className="w-full space-y-3 sm:space-y-4 md:space-y-5">
				{/* Row 1: Rating stat (fixed left) + scrolling cards (right) */}
				<div className="flex gap-3 sm:gap-4 md:gap-5">
					{/* Fixed stat block */}
					<motion.div
						className="ml-4 sm:ml-6 md:ml-32 shrink-0 bg-plum rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between w-[280px] h-[220px] md:h-[260px] border-2 border-white/40"
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.48, delay: 0.15 }}
						viewport={{ once: true }}>
						<div className="flex flex-col gap-2 sm:gap-3">
							<div className="flex -space-x-2">
								{[1, 2, 3, 4].map((i) => (
									<div
										key={i}
										className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sage/30 border-2 border-plum flex items-center justify-center">
										<span className="text-white/80 text-xs font-medium">
											{["SS", "R", "JT", "ME"][i - 1]}
										</span>
									</div>
								))}
							</div>
							<div className="flex gap-1">
								{[1, 2, 3, 4, 5].map((i) => (
									<Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-gold text-gold" />
								))}
							</div>
						</div>
						<div>
							<p className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-gold mb-1">
								5.0 / 5.0
							</p>
							<p className="text-gold/90 text-xs sm:text-sm font-medium">
								Average client rating
							</p>
						</div>
					</motion.div>

					{/* Scrolling content - Row 1 */}
					<motion.div
						className="flex-1 overflow-hidden"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.64, delay: 0.25 }}
						viewport={{ once: true }}>
						<div
							className="flex gap-4 w-max"
							style={{
								animation: `scroll-right ${ROW1_SLIDE_DURATION}s linear infinite`,
							}}>
							{/* Render cards 3 times for seamless loop */}
							{[0, 1, 2].map((iteration) => (
								<div key={iteration} className="flex gap-4">
									{row1Cards.map((card, idx) => (
										<div key={`${card.id}-${iteration}-${idx}`} className={card.width}>
											{card.type === "review" ? (
												<ReviewCard review={card.data} />
											) : (
												<ImageCard src={card.data.src} alt={card.data.alt} />
											)}
										</div>
									))}
								</div>
							))}
						</div>
					</motion.div>
				</div>

				{/* Row 2: Full width scrolling (left) */}
				<motion.div
					className="overflow-hidden"
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.64, delay: 0.3 }}
					viewport={{ once: true }}>
					<div
						className="flex gap-4 w-max"
						style={{
							animation: `scroll-left ${ROW2_SLIDE_DURATION}s linear infinite`,
						}}>
						{[0, 1, 2].map((iteration) => (
							<div key={iteration} className="flex gap-4">
								{row2Cards.map((card, idx) => (
									<div key={`${card.id}-${iteration}-${idx}`} className={card.width}>
										{card.type === "review" ? (
											<ReviewCard review={card.data} />
										) : (
											<ImageCard src={card.data.src} alt={card.data.alt} />
										)}
									</div>
								))}
							</div>
						))}
					</div>
				</motion.div>

				{/* Row 3: Scrolling cards (left) + Gardens stat (fixed right) */}
				<div className="flex gap-3 sm:gap-4 md:gap-5">
					{/* Scrolling content - Row 3 */}
					<motion.div
						className="flex-1 overflow-hidden"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.64, delay: 0.35 }}
						viewport={{ once: true }}>
						<div
							className="flex gap-4 w-max"
							style={{
								animation: `scroll-right ${ROW3_SLIDE_DURATION}s linear infinite`,
							}}>
							{[0, 1, 2].map((iteration) => (
								<div key={iteration} className="flex gap-4">
									{row3Cards.map((card, idx) => (
										<div key={`${card.id}-${iteration}-${idx}`} className={card.width}>
											{card.type === "review" ? (
												<ReviewCard review={card.data} />
											) : (
												<ImageCard src={card.data.src} alt={card.data.alt} />
											)}
										</div>
									))}
								</div>
							))}
						</div>
					</motion.div>

					{/* Fixed stat block */}
					<motion.div
						className="mr-4 sm:mr-6 md:mr-32 shrink-0 bg-plum rounded-2xl p-4 sm:p-6 flex flex-col justify-between w-[200px] h-[220px] md:h-[260px] border-2 border-white/40"
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.48, delay: 0.2 }}
						viewport={{ once: true }}>
						<p className="text-white/60 text-xs">Projects delivered</p>
						<div>
							<p className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-gold">
								50+
							</p>
							<p className="text-gold text-xs sm:text-sm font-medium mt-1">
								Gardens created
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default MovingReviewSection;
