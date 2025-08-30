import "../App.css";
import { Carousel } from "../components/Carousel";
import { CTASection } from "../components/CTASection";
import { WhyChooseClearLink } from "../components/Features";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/NavBar";
import { Support } from "../components/Support";


export const LandingPage = () => {
  return <div className="w-screen h-auto">
    <Navbar />
    <Hero />
    <WhyChooseClearLink />
    <Carousel />
    <Support />
    <CTASection />
    <Footer />
  </div>;
};
