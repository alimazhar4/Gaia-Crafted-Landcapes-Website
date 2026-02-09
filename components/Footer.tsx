const Footer = () => {
	return (
		<footer className="bg-plum-dark py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-0">
			<div className="max-w-[1400px] mx-auto px-0 md:px-16 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 md:gap-8 text-center md:text-left">
				{/* Left - company name in gold */}
				<p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gold">
					Gaia Crafted Landscapes Ltd
				</p>

				{/* Right - tagline and location in white */}
				<div className="text-center md:text-right">
					<p className="text-white text-xs sm:text-sm md:text-base">
						Landscape Design & Build
					</p>
					<p className="text-white/90 text-xs sm:text-sm mt-1">South Wales</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
