import { useState } from "react";
import { MainContent } from "./MainContent";
import { PlusIcon } from "../icons/PlusIcon";
import { MinusIcon } from "../icons/MinusIcon";

interface FAQsProps {
    question: string,
    answer: string
}

const FAQs = ({ question, answer }: FAQsProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl p-4 sm:p-5 md:p-6 rounded-md border border-gray-200 bg-gray-50 shadow-sm font-inter transition-all duration-200 mx-auto">
            <h3 className="flex items-center justify-between gap-4 text-gray-900 font-medium text-base sm:text-lg md:text-lg relative">
                <span className="flex-1">{question}</span>
                <span className="flex-shrink-0">
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                </span>
            </h3>
            {isOpen && (
                <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed transition-all duration-500">
                    {answer}
                </p>
            )}
        </div>


    )
}

export const Support = () => {
    return (
        <MainContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto font-inter gap-6 md:gap-8 lg:gap-10 my-12 md:my-20 px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Left Section */}
                <div className="w-full flex flex-col justify-center lg:justify-start gap-3">
                    <p className="text-blue-700 font-semibold text-sm sm:text-base md:text-lg">
                        Support
                    </p>
                    <h1 className="text-3xl sm:text-3xl md:text-4xl font-semibold leading-snug">
                        FAQs
                    </h1>
                    <p className="w-full text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                        Everything you need to know about the product{" "}
                        <br className="hidden md:block" />
                        and billing. Can't find answer you're looking{" "}
                        <br className="hidden md:block" />
                        for? Please{" "}
                        <span className="underline cursor-pointer">chat with our friendly team</span>
                    </p>
                </div>

                {/* Right Section - FAQs */}
                <div className="flex flex-col items-center md:items-start gap-6 w-full">
                    <FAQs
                        question="How many participants can join a SyncUp video conference?"
                        answer="SyncUp offers flexible meeting options. Depending on your subscription plan, you can host meetings with varying numbers of participants. Our plans are designed to accommodate small team collaborations and large-scale webinars, ensuring you have the right fit for your needs."
                    />
                    <FAQs
                        question="Can I use SyncUp on multiple devices?"
                        answer="Yes, SyncUp is designed to work seamlessly across multiple devices. You can access your meetings from desktops, laptops, tablets, or mobile phones, ensuring you stay connected anytime, anywhere."
                    />
                    <FAQs
                        question="Is SyncUp compatible with other video conferencing platforms?"
                        answer="SyncUp is built with flexibility in mind. While it offers a complete end-to-end experience on its own, it also integrates with other popular collaboration and productivity tools to enhance your workflow."
                    />
                    <FAQs
                        question="How does SyncUp ensure the security of my video conferences?"
                        answer="Security is a top priority at SyncUp. All video conferences are protected with end-to-end encryption, secure access controls, and regular system updates to safeguard your data and communications."
                    />
                    <FAQs
                        question="Do I need to download any software to use SyncUp?"
                        answer="No, SyncUp runs directly in your web browser. For users who prefer apps, SyncUp also provides desktop and mobile applications for an optimized experience."
                    />
                    <FAQs
                        question="What kind of customer support does SyncUp provide?"
                        answer="SyncUp offers 24/7 customer support through chat, email, and a comprehensive help center. Our team is dedicated to resolving your issues quickly so you can focus on your meetings without interruptions."
                    />
                </div>
            </div>

        </MainContent>
    )
}