const Footer = () => {
	return (
		<footer className="bg-plum-dark py-12 md:py-16">
			<div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
				{/* Left - company name in gold */}
				<p className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gold">
					Gaia Crafted Landscapes Ltd
				</p>

				{/* Right - tagline and location in white */}
				<div className="text-right">
					<p className="text-white text-sm md:text-base">
						Landscape Design & Build
					</p>
					<p className="text-white/90 text-sm mt-1">South Wales</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
