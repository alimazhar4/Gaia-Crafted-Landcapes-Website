"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

const enquiryBgImage = "/Thornbury/IMG_1325.JPG";

type ProjectType =
	| "full-landscaping"
	| "planters-pergolas"
	| "garden-design"
	| "patio-paving"
	| "fencing"
	| "driveway"
	| "garden-room";

type JourneyStage = "planning" | "only-quote" | "multiple-quotes" | "ready";

interface FormData {
	projectType: ProjectType | null;
	journeyStage: JourneyStage | null;
	name: string;
	phone: string;
	email: string;
	postcode: string;
}

const projectOptions: {
	id: ProjectType;
	label: string;
	icon: React.ReactNode;
}[] = [
	{
		id: "full-landscaping",
		label: "Full Garden Landscaping",
		icon: (
			<svg
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z" />
				<path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
			</svg>
		),
	},
	{
		id: "planters-pergolas",
		label: "Planters & Pergolas",
		icon: (
			<svg
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M4 22V12h16v10" />
				<path d="M4 12V8h16v4" />
				<path d="M12 8V4" />
				<path d="M8 4h8" />
			</svg>
		),
	},
	{
		id: "garden-design",
		label: "Garden Design Service",
		icon: (
			<svg
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M12 2L2 7l10 5 10-5-10-5z" />
				<path d="M2 17l10 5 10-5" />
				<path d="M2 12l10 5 10-5" />
			</svg>
		),
	},
	{
		id: "patio-paving",
		label: "Patio or Paving",
		icon: (
			<svg
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round">
				<rect x="3" y="3" width="7" height="7" />
				<rect x="14" y="3" width="7" height="7" />
				<rect x="14" y="14" width="7" height="7" />
				<rect x="3" y="14" width="7" height="7" />
			</svg>
		),
	},
	{
		id: "fencing",
		label: "Fencing",
		icon: (
			<svg
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M4 6v14" />
				<path d="M12 6v14" />
				<path d="M20 6v14" />
				<path d="M4 10h16" />
				<path d="M4 14h16" />
				<path d="M4 6l2-4 2 4" />
				<path d="M10 6l2-4 2 4" />
				<path d="M18 6l2-4" />
			</svg>
		),
	},
	{
		id: "driveway",
		label: "Driveway",
		icon: (
			<svg
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M4 19l4-14h8l4 14" />
				<path d="M6 19h12" />
				<path d="M7.5 12h9" />
			</svg>
		),
	},
	{
		id: "garden-room",
		label: "Garden Room",
		icon: (
			<svg
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M3 21h18" />
				<path d="M5 21V7l7-4 7 4v14" />
				<rect x="9" y="13" width="6" height="8" />
				<path d="M9 13V9h6v4" />
			</svg>
		),
	},
];

const journeyOptions: { id: JourneyStage; label: string }[] = [
	{ id: "planning", label: "I'm still planning and researching" },
	{ id: "only-quote", label: "This is the only quote I'm getting" },
	{ id: "multiple-quotes", label: "I've already received a few quotes" },
	{ id: "ready", label: "I'm ready to get started" },
];

const GardenEnquiryForm = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<FormData>({
		projectType: null,
		journeyStage: null,
		name: "",
		phone: "",
		email: "",
		postcode: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const totalSteps = 3;

	const goToNextStep = () => {
		if (currentStep < totalSteps) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const goToPreviousStep = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleProjectSelect = (projectType: ProjectType) => {
		setFormData((prev) => ({ ...prev, projectType }));
	};

	const handleJourneySelect = (journeyStage: JourneyStage) => {
		setFormData((prev) => ({ ...prev, journeyStage }));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setIsSubmitting(false);
		setIsSubmitted(true);
	};

	const canProceedStep1 = formData.projectType !== null;
	const canProceedStep2 = formData.journeyStage !== null;
	const canSubmit =
		formData.name && formData.email && formData.phone && formData.postcode;

	const getSlideClasses = (step: number) => {
		if (step === currentStep) {
			return "translate-x-0 opacity-100";
		}
		if (step < currentStep) {
			return "-translate-x-full opacity-0 absolute";
		}
		return "translate-x-full opacity-0 absolute";
	};

	if (isSubmitted) {
		return (
			<section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden px-4 sm:px-6 md:px-0">
				{/* Background image */}
				<div className="absolute inset-0 z-0">
					<Image
						src={enquiryBgImage}
						alt=""
						fill
						className="object-cover"
						sizes="100vw"
					/>
				</div>
				{/* Gradient: top to bottom (dark at top, transparent at bottom) */}
				<div className="absolute inset-0 z-10 bg-gradient-to-b from-plum-dark via-plum-dark/90 to-transparent" />
				<div className="relative z-20 max-w-[800px] mx-auto px-0 md:px-16 text-center">
					<motion.div
						className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold mb-6 sm:mb-8"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.48, delay: 0.1 }}>
						<Check className="w-8 h-8 sm:w-10 sm:h-10 text-plum" />
					</motion.div>
					<motion.h2
						className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 sm:mb-6"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.64, delay: 0.1 }}>
						Thank you for your enquiry
					</motion.h2>
					<motion.p
						className="text-base sm:text-xl text-white/80"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.48, delay: 0.3 }}>
						We&apos;ll be in touch within 24 hours to discuss your garden project.
					</motion.p>
				</div>
			</section>
		);
	}

	return (
		<section
			id="garden-enquiry"
			className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden px-4 sm:px-6 md:px-0">
			{/* Background image */}
			<div className="absolute inset-0 z-0">
				<Image
					src={enquiryBgImage}
					alt=""
					fill
					className="object-cover"
					sizes="100vw"
				/>
			</div>
			{/* Gradient: top to bottom (dark at top, transparent at bottom) */}
			<div className="absolute inset-0 z-10 bg-gradient-to-b from-plum-dark via-plum-dark/90 to-transparent" />
			<div className="relative z-20 max-w-[1000px] mx-auto px-0 md:px-16">
				{/* Header */}
				<div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
					<motion.span
						className="inline-flex items-center bg-gold text-white px-4 py-2 rounded-full mb-4 sm:mb-6 text-sm font-medium tracking-wide"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.48 }}>
						Get Started
					</motion.span>
					<motion.h2
						className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white mb-4 sm:mb-6"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.64, delay: 0.1 }}>
						Start your garden enquiry
					</motion.h2>
					<motion.p
						className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.48, delay: 0.1 }}>
						Tell us a little about your project and we&apos;ll be in touch to discuss
						your ideas, timings, and next steps.
					</motion.p>
				</div>

				{/* Progress indicator */}
				<motion.div
					className="flex items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.48, delay: 0.3 }}>
					{[1, 2, 3].map((step) => (
						<div key={step} className="flex items-center gap-2 sm:gap-3">
							<div
								className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-medium text-xs sm:text-sm transition-all duration-300 ${
									step < currentStep
										? "bg-gold text-white"
										: step === currentStep
											? "bg-white text-plum"
											: "bg-white/20 text-white/60"
								}`}>
								{step < currentStep ? <Check className="w-5 h-5" /> : step}
							</div>
							{step < 3 && (
								<div
									className={`w-8 sm:w-12 md:w-20 h-0.5 transition-all duration-500 ${
										step < currentStep ? "bg-gold" : "bg-white/20"
									}`}
								/>
							)}
						</div>
					))}
				</motion.div>

				{/* Form container */}
				<motion.div
					className="bg-sage-light rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-12 md:pb-8 shadow-xl"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.64, delay: 0.2 }}>
					<form onSubmit={handleSubmit}>
						<div className="relative min-h-[360px] sm:min-h-[400px] overflow-hidden">
							{/* Step 1 - Project Type */}
							<div
								className={`w-full transition-all duration-500 ease-in-out ${getSlideClasses(1)}`}>
								<motion.h3
									className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-plum mb-2"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.48, delay: 0.1 }}>
									What best describes your project?
								</motion.h3>
								<motion.p
									className="text-plum/60 text-sm sm:text-base mb-5 sm:mb-6 md:mb-8"
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.15 }}>
									Select one option to continue
								</motion.p>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
									{projectOptions.map((option, index) => (
										<motion.button
											key={option.id}
											type="button"
											onClick={() => handleProjectSelect(option.id)}
											className={`group relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 ${
												formData.projectType === option.id
													? "border-plum bg-plum text-white shadow-lg shadow-plum/30"
													: "border-plum/25 hover:border-plum/40 bg-sage/30 hover:bg-sage/50 text-plum"
											}`}
											initial={{ opacity: 0, y: 30 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.48, delay: 0.2 + index * 0.05 }}>
											<div className="flex items-start gap-3 sm:gap-4">
												<span
													className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors ${
														formData.projectType === option.id
															? "bg-white/20 text-gold"
															: "bg-plum/10 text-plum group-hover:bg-plum/20"
													}`}>
													{option.icon}
												</span>
												<div className="flex-1 min-w-0">
													<span
														className={`block font-medium text-sm sm:text-base leading-tight ${
															formData.projectType === option.id ? "text-white" : "text-plum"
														}`}>
														{option.label}
													</span>
												</div>
											</div>
										</motion.button>
									))}
								</div>
							</div>

							{/* Step 2 - Journey Stage */}
							<div
								className={`w-full transition-all duration-500 ease-in-out ${getSlideClasses(2)}`}>
								<motion.h3
									className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-plum mb-2"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.48, delay: 0.1 }}>
									Where are you in your renovation journey?
								</motion.h3>
								<motion.p
									className="text-plum/60 text-sm sm:text-base mb-5 sm:mb-6 md:mb-8"
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.3 }}>
									This helps us understand your timeline
								</motion.p>
								<div className="space-y-2 sm:space-y-3">
									{journeyOptions.map((option, index) => (
										<motion.button
											key={option.id}
											type="button"
											onClick={() => handleJourneySelect(option.id)}
											className={`w-full p-4 sm:p-5 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-3 sm:gap-4 cursor-pointer ${
												formData.journeyStage === option.id
													? "border-plum bg-plum text-white"
													: "border-plum/25 hover:border-plum/50 bg-sage/30"
											}`}
											initial={{ opacity: 0, x: -30 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.48, delay: 0.2 + index * 0.05 }}>
											<span
												className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
													formData.journeyStage === option.id
														? "border-gold bg-gold"
														: "border-plum/40"
												}`}>
												{formData.journeyStage === option.id && (
													<Check className="w-3 h-3 text-white" />
												)}
											</span>
											<span
												className={`text-base sm:text-lg ${
													formData.journeyStage === option.id ? "text-white" : "text-plum"
												}`}>
												{option.label}
											</span>
										</motion.button>
									))}
								</div>
							</div>

							{/* Step 3 - Contact Details */}
							<div
								className={`w-full transition-all duration-500 ease-in-out ${getSlideClasses(3)}`}>
								<motion.h3
									className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-plum mb-2"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.48, delay: 0.1 }}>
									Your contact details
								</motion.h3>
								<motion.p
									className="text-plum/60 text-sm sm:text-base mb-5 sm:mb-6 md:mb-8"
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.3 }}>
									We&apos;ll use these to get in touch
								</motion.p>
								<div className="space-y-4 sm:space-y-5">
									{/* Row 1: Name - full width */}
									<div className="w-full">
										<label
											htmlFor="name"
											className="block text-sm font-medium text-plum/80 mb-2">
											Name *
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											required
											className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl bg-sage/20 border-2 border-plum/30 text-plum placeholder-plum/40 focus:outline-none focus:border-plum transition-colors text-base"
											placeholder="Your full name"
										/>
									</div>
									{/* Row 2: Email - full width */}
									<div className="w-full">
										<label
											htmlFor="email"
											className="block text-sm font-medium text-plum/80 mb-2">
											Email *
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											required
											className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl bg-sage/20 border-2 border-plum/30 text-plum placeholder-plum/40 focus:outline-none focus:border-plum transition-colors text-base"
											placeholder="your@email.com"
										/>
									</div>
									{/* Row 3: Phone | Postcode */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
										<div>
											<label
												htmlFor="phone"
												className="block text-sm font-medium text-plum/80 mb-2">
												Phone Number *
											</label>
											<input
												type="tel"
												id="phone"
												name="phone"
												value={formData.phone}
												onChange={handleInputChange}
												required
												className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl bg-sage/20 border-2 border-plum/30 text-plum placeholder-plum/40 focus:outline-none focus:border-plum transition-colors text-base"
												placeholder="Your phone number"
											/>
										</div>
										<div>
											<label
												htmlFor="postcode"
												className="block text-sm font-medium text-plum/80 mb-2">
												Postcode *
											</label>
											<input
												type="text"
												id="postcode"
												name="postcode"
												value={formData.postcode}
												onChange={handleInputChange}
												required
												className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl bg-sage/20 border-2 border-plum/30 text-plum placeholder-plum/40 focus:outline-none focus:border-plum transition-colors text-base"
												placeholder="e.g. SW1A 1AA"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* No pressure - lower right, above line (Step 3 only) */}
						{currentStep === 3 && (
							<div className="flex justify-end mt-5 sm:mt-8">
								<p className="text-plum/60 text-xs sm:text-sm">
									No pressure. Just an initial conversation.
								</p>
							</div>
						)}

						{/* Navigation buttons */}
						<motion.div
							className={`${currentStep === 3 ? "mt-2" : currentStep === 2 ? "mt-6 sm:mt-10" : "mt-6 sm:mt-8"} flex items-center justify-between pt-4 border-t border-plum/20 `}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.2 }}>
							<button
								type="button"
								onClick={goToPreviousStep}
								className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-plum/70 hover:text-plum transition-all cursor-pointer text-sm sm:text-base ${
									currentStep === 1 ? "opacity-0 pointer-events-none" : ""
								}`}>
								<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
								<span>Back</span>
							</button>
							{currentStep < 3 ? (
								<button
									type="button"
									onClick={goToNextStep}
									disabled={
										(currentStep === 1 && !canProceedStep1) ||
										(currentStep === 2 && !canProceedStep2)
									}
									className="flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3.5 rounded-full bg-plum text-white font-medium hover:bg-plum/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base">
									<span>Continue</span>
									<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
								</button>
							) : (
								<div className="text-right">
									<button
										type="submit"
										disabled={!canSubmit || isSubmitting}
										className="flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3.5 rounded-full bg-plum text-white font-medium hover:bg-plum/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base">
										{isSubmitting ? (
											<>
												<svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
														fill="none"
													/>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													/>
												</svg>
												<span>Submitting...</span>
											</>
										) : (
											<>
												<span>Submit Enquiry</span>
												<ChevronRight className="w-5 h-5" />
											</>
										)}
									</button>
								</div>
							)}
						</motion.div>
					</form>
				</motion.div>
			</div>
		</section>
	);
};

export default GardenEnquiryForm;
