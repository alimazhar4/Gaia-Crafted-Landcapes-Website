import Image from "next/image";
import { Star, Quote } from "lucide-react";

const reviewGarden1 = "/Caldicot/After5.JPG";
const reviewGarden2 = "/Chepstow Finches Close/After2.JPG";
const reviewGarden3 = "/Caldicot/After1.JPG";

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

const ReviewsSection = () => {
	return (
		<section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-plum-dark px-4 sm:px-6 md:px-0">
			<div className="max-w-[1400px] mx-auto px-0 md:px-16">
				{/* Header */}
				<div className="mb-10 sm:mb-12 md:mb-16 lg:mb-20">
					<div className="inline-flex items-center bg-gold text-white px-4 py-2 rounded-full mb-4 sm:mb-6">
						<span className="text-sm font-medium tracking-wide">
							Client Reviews
						</span>
					</div>
					<h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white">
						Gardens crafted with care,
						<br />
						<span className="text-white/80">stories told by our clients</span>
					</h2>
				</div>

				{/* Row 1 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5">
					{/* Stat Block - Rating */}
					<div className="lg:col-span-3 bg-plum rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-[200px] sm:h-[240px] md:h-[260px] border-2 border-white/40">
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
					</div>

					{/* Review Card - Featured (Sarah Stylianou) */}
					<div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-[200px] sm:h-[240px] md:h-[260px] border-2 border-white/40">
						<div>
							<div className="flex gap-0.5 mb-2 sm:mb-3">
								{[1, 2, 3, 4, 5].map((i) => (
									<Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold text-gold" />
								))}
							</div>
							<p className="text-plum/80 leading-relaxed text-xs sm:text-sm">
								&quot;{reviews[0].quote}&quot;
							</p>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-plum text-xs sm:text-sm">
									{reviews[0].name}
								</p>
								{reviews[0].location && (
									<p className="text-plum/50 text-xs">{reviews[0].location}</p>
								)}
							</div>
							<Quote className="w-5 h-5 sm:w-6 sm:h-6 text-sage" />
						</div>
					</div>

					{/* Image Block 1 (hidden on mobile) */}
					<div className="hidden md:block relative lg:col-span-5 rounded-2xl overflow-hidden h-[200px] sm:h-[240px] md:h-[260px]">
						<Image
							src={reviewGarden1}
							alt="Beautiful garden pathway"
							fill
							className="object-cover hover:scale-105 transition-transform duration-500"
						/>
					</div>
				</div>

				{/* Row 2 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5">
					{/* Image Block 2 (hidden on mobile) */}
					<div className="hidden md:block relative lg:col-span-4 rounded-2xl overflow-hidden h-[180px] sm:h-[220px] md:h-[240px]">
						<Image
							src={reviewGarden2}
							alt="Modern garden room"
							fill
							className="object-cover hover:scale-105 transition-transform duration-500"
						/>
					</div>

					{/* Review 2 - Sage */}
					<div className="lg:col-span-4 bg-sage-light rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[180px] sm:h-[220px] md:h-[240px] border-2 border-white/40">
						<div>
							<div className="flex gap-0.5 mb-2 sm:mb-3">
								{[1, 2, 3, 4, 5].map((i) => (
									<Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold text-gold" />
								))}
							</div>
							<p className="text-plum/80 leading-relaxed text-xs sm:text-sm">
								&quot;{reviews[2].quote}&quot;
							</p>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-plum text-xs sm:text-sm">
									{reviews[2].name}
								</p>
								<p className="text-plum/50 text-xs">{reviews[2].location}</p>
							</div>
							<Quote className="w-5 h-5 sm:w-6 sm:h-6 text-plum/30" />
						</div>
					</div>

					{/* Review - Robert */}
					<div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[180px] sm:h-[220px] md:h-[240px] border-2 border-white/40">
						<div>
							<div className="flex gap-0.5 mb-2 sm:mb-3">
								{[1, 2, 3, 4, 5].map((i) => (
									<Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold text-gold" />
								))}
							</div>
							<p className="text-plum/80 leading-relaxed text-xs sm:text-sm">
								&quot;{reviews[1].quote}&quot;
							</p>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-plum text-xs sm:text-sm">
									{reviews[1].name}
								</p>
								{reviews[1].location && (
									<p className="text-plum/50 text-xs">{reviews[1].location}</p>
								)}
							</div>
							<Quote className="w-5 h-5 sm:w-6 sm:h-6 text-sage" />
						</div>
					</div>
				</div>

				{/* Row 3 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
					{/* Review - Sophie Baron (sage, row 3 left) */}
					<div className="lg:col-span-3 bg-sage-light rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[160px] sm:h-[200px] md:h-[220px] border-2 border-white/40">
						<div>
							<div className="flex gap-0.5 mb-2 sm:mb-3">
								{[1, 2, 3, 4, 5].map((i) => (
									<Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold text-gold" />
								))}
							</div>
							<p className="text-plum/80 leading-relaxed text-xs sm:text-sm">
								&quot;{reviews[4].quote}&quot;
							</p>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-plum text-xs sm:text-sm">
									{reviews[4].name}
								</p>
								{reviews[4].location && (
									<p className="text-plum/50 text-xs">{reviews[4].location}</p>
								)}
							</div>
							<Quote className="w-5 h-5 sm:w-6 sm:h-6 text-plum/30" />
						</div>
					</div>

					{/* Review 3 - Michael Edwards (dark) */}
					<div className="lg:col-span-4 bg-charcoal rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[160px] sm:h-[200px] md:h-[220px] border-2 border-white/40">
						<div>
							<div className="flex gap-0.5 mb-2 sm:mb-3">
								{[1, 2, 3, 4, 5].map((i) => (
									<Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold text-gold" />
								))}
							</div>
							<p className="text-white/80 leading-relaxed text-xs sm:text-sm">
								&quot;{reviews[3].quote}&quot;
							</p>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-white text-xs sm:text-sm">
									{reviews[3].name}
								</p>
								<p className="text-white/50 text-xs">{reviews[3].location}</p>
							</div>
							<Quote className="w-5 h-5 sm:w-6 sm:h-6 text-white/20" />
						</div>
					</div>

					{/* Image Block 3 (hidden on mobile) */}
					<div className="hidden md:block relative lg:col-span-3 rounded-2xl overflow-hidden h-[180px] sm:h-[200px] md:h-[220px]">
						<Image
							src={reviewGarden3}
							alt="Elegant pergola"
							fill
							className="object-cover hover:scale-105 transition-transform duration-500"
						/>
					</div>

					{/* Stat Block - Gardens */}
					<div className="lg:col-span-2 bg-plum rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[160px] sm:h-[200px] md:h-[220px] border-2 border-white/40">
						<p className="text-white/60 text-xs">Projects delivered</p>
						<div>
							<p className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-gold">
								50+
							</p>
							<p className="text-gold text-xs sm:text-sm font-medium mt-1">
								Gardens created
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ReviewsSection;
