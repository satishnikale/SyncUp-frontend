import { MainContent } from "./MainContent";
import review_2 from "../assets/friends-family-img.jpg";
import myImage from "../assets/satish-img.jpg";
import { useState } from "react";
import { LeftArrow } from "../icons/LeftArrow";
import { RightArrow } from "../icons/RightArrow";

export const Carousel = () => {
    const slides = [review_2];
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <MainContent>
            <div className="font-inter w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-16">
                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                    {/* Text */}
                    <div className="w-full text-center lg:text-left">
                        <h1 className="w-full text-lg sm:text-xl md:text-3xl lg:text-4xl 
                   font-medium leading-relaxed lg:leading-tight">
                            SyncUp has upgraded our <br className="hidden sm:block" />
                            remote meetings. High-quality <br className="hidden sm:block" />
                            video, screen sharing, and <br className="hidden sm:block" />
                            top-notch security make it <br className="hidden sm:block" />
                            essential for you.
                        </h1>
                        <div className="flex justify-center lg:justify-start mt-8 mb-4 gap-4 md:gap-4 my-4">
                            <img className="w-10 rounded-full" src={myImage} alt="" />
                            <div className="flex flex-col">
                                <p className="">Satish Nikale</p>
                                <p className="text-darkGray text-[12px]">Software Engineer</p>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
                        {slides.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Slide ${index}`}
                                className="w-full md:w-[90%] lg:w-[90%] h-auto object-cover rounded-lg shadow-md mx-auto"
                            />
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center items-center gap-6 sm:gap-10 md:gap-12 my-6">
                    <button
                        onClick={prevSlide}
                        className="text-blue-600 rounded-full p-2 border border-gray-300 hover:bg-blue-50 transition"
                    >
                        <LeftArrow />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="text-blue-600 rounded-full p-2 border border-gray-300 hover:bg-blue-50 transition"
                    >
                        <RightArrow />
                    </button>
                </div>
            </div>
        </MainContent>
    );
};
