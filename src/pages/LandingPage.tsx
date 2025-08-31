import "../App.css";
import { Carousel } from "../components/Carousel";
import { CTASection } from "../components/CTASection";
import { WhyChooseSyncUp } from "../components/Features";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Support } from "../components/Support";


export const LandingPage = () => {
  return <div className="w-screen h-auto">
    <Hero />
    <WhyChooseSyncUp />
    <Carousel />
    <Support />
    <CTASection />
    <Footer />
  </div>;
};
