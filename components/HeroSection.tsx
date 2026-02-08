"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Star, Phone, Instagram, Facebook } from "lucide-react";
import { useLenis } from "lenis/react";
import { ENQUIRY_SECTION_ID } from "@/lib/scroll-targets";

const HERO_IMAGES = [
	"/Caldicot/IMG_0658.JPG",
	"/St Nicholas/After1.JPG",
	// "/Thornbury/IMG_1325.JPG",
];

function getRandomIndex(exclude?: number): number {
	let idx = Math.floor(Math.random() * HERO_IMAGES.length);
	if (exclude !== undefined && HERO_IMAGES.length > 1) {
		while (idx === exclude) {
			idx = Math.floor(Math.random() * HERO_IMAGES.length);
		}
	}
	return idx;
}

const HeroSection = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const lenis = useLenis();

	const scrollToEnquiry = () => {
		const el = document.getElementById(ENQUIRY_SECTION_ID);
		if (el) lenis?.scrollTo(el, { offset: 0 });
	};

	// On load: pick random image (deferred to avoid synchronous setState in effect)
	useEffect(() => {
		const id = setTimeout(() => setCurrentIndex(getRandomIndex()), 0);
		return () => clearTimeout(id);
	}, []);

	// Every 10s: pick another random image (different from current)
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => getRandomIndex(prev));
		}, 10000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative min-h-screen overflow-hidden bg-white flex flex-col">
			{/* Full-bleed background images - stacked with crossfade */}
			<div className="absolute top-0 right-0 w-full lg:w-[55%] h-full">
				{HERO_IMAGES.map((src, index) => (
					<Image
						key={src}
						src={src}
						alt="Luxurious landscape design with elegant outdoor living space"
						fill
						className={`object-cover transition-opacity duration-1000 ease-in-out ${
							currentIndex === index ? "opacity-100" : "opacity-0"
						}`}
						priority={index === 0}
						sizes="(max-width: 1024px) 100vw, 55vw"
					/>
				))}
				<div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent lg:from-white lg:via-white/25 lg:to-transparent" />

				{/* Testimonial overlay - glass effect */}
				<div
					className="absolute bottom-10 right-6 sm:right-10 left-6 sm:left-auto sm:max-w-[300px] bg-plum/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl shadow-plum/20 animate-fade-in"
					style={{ animationDelay: "0.7s" }}>
					<div className="flex gap-1 mb-3">
						{[...Array(5)].map((_, i) => (
							<Star key={i} className="w-4 h-4 fill-gold text-gold" />
						))}
					</div>
					<p className="font-sans text-sm text-white/90 leading-relaxed">
						&ldquo;Gaia Crafted transformed our backyard into an absolute
						paradise. Their attention to detail and design expertise is
						unmatched.&rdquo;
					</p>
				</div>
			</div>

			{/* Top bar with logo */}
			<div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 pt-6 lg:pt-8">
				<div
					className="flex items-center justify-between animate-fade-in"
					style={{ animationDelay: "0s" }}>
					<Image
						src="/logo.png"
						alt="Gaia Crafted Landscapes"
						width={120}
						height={96}
						className="h-20 sm:h-24 w-auto"
					/>
				</div>
			</div>

			{/* Phone + social icons - top right */}
			<div
				className="absolute top-6 lg:top-8 right-6 sm:right-10 z-20 flex items-center gap-4 animate-fade-in"
				style={{ animationDelay: "0.5s" }}>
				<a
					href="tel:+447903533879"
					className="inline-flex items-center gap-2 bg-plum text-white px-5 py-3 rounded-full text-base font-medium hover:bg-gold hover:scale-105 transition-all duration-300">
					<Phone className="w-5 h-5" />
					<span>07903 533879</span>
				</a>
				<div className="flex items-center gap-2">
					<a
						href="https://www.instagram.com/gaiacraftedlandscapes/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold text-white hover:bg-plum hover:scale-110 transition-all duration-300">
						<Instagram className="w-5 h-5" />
					</a>
					<a
						href="https://www.facebook.com/people/Gaia-Crafted-Landscapes/61587031237725/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold text-white hover:bg-plum hover:scale-110 transition-all duration-300">
						<Facebook className="w-5 h-5" />
					</a>
				</div>
			</div>

			{/* Left content */}
			<div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 pb-16 flex-1 flex items-center">
				<div className="flex flex-col gap-8 max-w-xl">
					{/* Badge */}
					<div
						className="animate-fade-in inline-flex items-center gap-2.5 bg-gold px-4 py-2 rounded-full w-fit"
						style={{ animationDelay: "0.1s" }}>
						<span className="w-2 h-2 rounded-full bg-plum animate-pulse-dot" />
						<span className="text-sm font-sans text-white font-medium">
							Available for projects
						</span>
					</div>

					{/* Heading */}
					<h1
						className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] xl:text-[3.5rem] font-semibold leading-[1.1] tracking-tight text-plum animate-slide-up"
						style={{ animationDelay: "0.2s" }}>
						Thoughtfully Designed Gardens, Crafted to Last
					</h1>

					{/* Subtitle */}
					<p
						className="font-sans text-base md:text-lg text-charcoal/70 leading-relaxed max-w-md animate-slide-up"
						style={{ animationDelay: "0.4s" }}>
						Bespoke landscape design and build, creating considered outdoor
						spaces that feel natural, functional, and truly personal.
					</p>

					{/* CTA */}
					<div
						className="animate-slide-up flex flex-col gap-2"
						style={{ animationDelay: "0.6s" }}>
						<button
							type="button"
							onClick={scrollToEnquiry}
							className="group inline-flex items-center gap-2 bg-plum text-white px-6 py-2 rounded-full text-base font-medium hover:bg-plum/90 transition-all duration-300 w-fit cursor-pointer">
							<span>Start Your Garden Enquiry</span>
							<span className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
								<ArrowUpRight className="w-5 h-5" />
							</span>
						</button>
						<p className="font-sans text-sm text-charcoal/60">
							Design-led projects across South Wales
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
