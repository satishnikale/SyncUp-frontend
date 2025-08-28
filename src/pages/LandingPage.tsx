import "../App.css";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/NavBar";
export const LandingPage = () => {
  return <div className="w-screen h-auto">
    <Navbar />
    <Hero />
  </div>;
};
