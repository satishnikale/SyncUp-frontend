import { CheckCircle } from "../icons/CheckCirlce";
import videoCall from "../assets/feature-img.png";


const features = [
    "30 days free trial",
    "Cancel at any time",
    "Access to all features",
    "Personalized onboarding",
];

export const CTASection = () => {
    return (
        <section className="w-full py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
            <div className="font-inter max-w-7xl bg-white mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
                {/* Left Content */}
                <div className="flex flex-col justify-center gap-6 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
                        Ready to clear the path to <br className="hidden sm:block" /> perfect communication?
                    </h2>

                    <ul className="flex flex-col gap-3 text-gray-700 text-base sm:text-lg">
                        {features.map((feature, idx) => (
                            <li key={idx} className="flex items-start mx-8 md:mx-0 md:justify-center lg:justify-start gap-2">
                                <CheckCircle />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
                        <button className="rounded-lg border border-gray-300 text-gray-900 px-6 py-2 text-base font-medium hover:bg-gray-100 transition">
                            Talk to sales
                        </button>
                        <button className="rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-2 text-base font-medium text-white transition">
                            Start your free trial
                        </button>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="w-full flex justify-center lg:justify-end">
                    <img
                        src={videoCall} // replace with actual image path
                        alt="Video call demo"
                        className="w-[90%] max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto rounded-xl shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};
