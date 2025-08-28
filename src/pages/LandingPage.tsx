import "../App.css";
import { WhyChooseClearLink } from "../components/Features";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/NavBar";
export const LandingPage = () => {
  return <div className="w-screen h-auto">
    <Navbar />
    <Hero />
    <WhyChooseClearLink />
  </div>;
};
