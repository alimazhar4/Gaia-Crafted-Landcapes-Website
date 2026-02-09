import HeroSection from "@/components/HeroSection";
import QualificationSection from "@/components/QualificationSection";
import ReviewsSection from "@/components/ReviewsSection";
import MovingReviewSection from "@/components/MovingReviewSection";
import GaiaCraftedWaySection from "@/components/GaiaCraftedWaySection";
import OurWorkSection from "@/components/OurWorkSection";
import ReassuranceSection from "@/components/ReassuranceSection";
import GardenEnquiryForm from "@/components/GardenEnquiryForm";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<QualificationSection />
			<OurWorkSection />
			<GaiaCraftedWaySection />
			<GardenEnquiryForm />
			<ReassuranceSection />
			{/* <ReviewsSection /> */}
			<MovingReviewSection />
			<FinalCTASection />
			<Footer />
		</main>
	);
}
