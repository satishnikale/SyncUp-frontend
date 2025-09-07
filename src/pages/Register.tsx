import { useForm } from "react-hook-form";
import axios from "axios"
import { MainContent } from "../components/MainContent";
import registerImage from "../assets/register-img.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import { Navbar } from "../components/NavBar";

type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Register() {
    const { handleRegister } = useAuth();
    const [error, setError] = useState();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            console.log("Register Data:", data);
            await handleRegister(data.name, data.email, data.password);
            // After successful registration
            reset();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // TS now knows it's an AxiosError
                setError(err.response?.data?.message || "Something went wrong");
            }
        }
    };

    // Watch password for confirmPassword validation
    const password = watch("password");

    return (
        <MainContent>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen p-4">
                {/* Main Card */}
                <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full">

                    {/* Left Side - Image */}
                    <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-50 p-6">
                        <img
                            src={registerImage} // 🔹 Replace with your image path
                            alt="Register Illustration"
                            className="max-w-sm w-full h-auto"
                        />
                    </div>

                    {/* Right Side - Form */}
                    <div className="flex w-full md:w-1/2 items-center justify-center p-6 md:p-10">
                        <div className="w-full max-w-md">
                            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                                Create an Account
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="name"
                                        {...register("name", { required: "Name is required" })}
                                        className={`w-full rounded-xl border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.name ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        className={`w-full rounded-xl border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.email ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="new-password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                        className={`w-full rounded-xl border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.password ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: (value) =>
                                                value === password || "Passwords do not match",
                                        })}
                                        className={`w-full rounded-xl border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="Re-enter your password"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                    {
                                        error && (
                                            <span className="mt-1 text-xs text-red-500">
                                                {error}
                                            </span>
                                        )
                                    }
                                </div>

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white rounded-xl py-2 text-sm font-medium hover:bg-blue-700 transition shadow-md"
                                >
                                    Register
                                </button>
                            </form>

                            <p className="text-center text-sm text-gray-600 mt-6">
                                Already have an account?{" "}
                                <Link className="text-blue-600 hover:underline font-medium" to={"/login"} >Login </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainContent>
    );
}
