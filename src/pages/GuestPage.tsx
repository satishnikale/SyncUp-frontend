import { MainContent } from "../components/MainContent";
import joinGuest from "../assets/join-guest-img.png";

import { useForm } from "react-hook-form";
import { Navbar } from "../components/NavBar";

export const JoinAsGuest = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Submit Handler
    const onSubmit = (data: any) => {
        console.log("Guest joined:", data);
        reset(); // Clear input fields after submit
    };

    return (
        <MainContent>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center font-inter px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden max-w-5xl w-full">

                    {/* Left Side - Image */}
                    <div className="hidden md:flex items-center justify-center bg-blue-50 p-6">
                        <img
                            src={joinGuest}
                            alt="Join as Guest Illustration"
                            className="w-4/5 h-auto"
                        />
                    </div>

                    {/* Right Side - Form */}
                    <div className="flex flex-col justify-center p-8 sm:p-12">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
                            Join as Guest
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name Input */}
                            <div>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    autoComplete="name"
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full rounded-xl border px-4 py-2 text-sm shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-600 border-gray-300"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name.message?.toString()}
                                    </p>
                                )}
                            </div>

                            {/* Room Code Input */}
                            <div>
                                <input
                                    id="room"
                                    type="text"
                                    placeholder="Enter room code"
                                    autoComplete="off"
                                    {...register("room", { required: "Room code is required" })}
                                    className="w-full rounded-xl border px-4 py-2 text-sm shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-600 border-gray-300"
                                />
                                {errors.room && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.room.message?.toString()}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white rounded-xl py-2 text-sm font-medium 
                         shadow-md hover:bg-blue-700 transition"
                            >
                                Join Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MainContent>
    );
}
