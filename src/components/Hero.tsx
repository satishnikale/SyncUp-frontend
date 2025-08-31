import { MainContent } from "./MainContent";
import heroImage from "../assets/vdo-img.png";
import { Link } from "react-router-dom";

export const Hero = () => {
    return (
        <MainContent>
            <div className="w-full max-w-7xl mx-auto my-20 px-4 md:px-8 font-inter flex flex-col lg:flex-row justify-between items-center gap-10">

                {/* Left Text Section */}
                <div className="flex-1 space-y-6 text-center md:text-left max-w-xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                        Uniting the world, <br className="hidden sm:block" /> one video call at a time
                    </h1>
                    <p className="text-darkGray text-sm sm:text-base md:text-lg leading-relaxed">
                        Experience the future of communication with SyncUp — <br className="hidden sm:block" />
                        where crystal-clear video conferencing meets <br className="hidden sm:block" />
                        unparalleled simplicity.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link to={"/register"} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                            Start your free trial
                        </Link>
                        <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50 transition">
                            Discover AI Assistant
                        </button>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={heroImage}
                        alt="hero-image"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border border-blue-300 rounded-2xl shadow-2xl shadow-slate-400"
                    />
                </div>
            </div>
        </MainContent>
    )
}