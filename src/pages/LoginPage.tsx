import { useForm } from "react-hook-form";
import { MainContent } from "../components/MainContent";
import { Link } from "react-router-dom";
import loginImage from "../assets/login-img.png";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import axios from "axios";
import { Navbar } from "../components/NavBar";


type LoginFormInputs = {
    username: string;
    password: string;
};

export const Login = () => {
    const { handleLogin } = useAuth();
    const [error, setError] = useState();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            console.log("Login Data:", data);
            await handleLogin(data.username, data.password);
            reset();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // TS now knows it's an AxiosError
                setError(err.response?.data?.message || "Something went wrong");
            }
            reset();
        }
    };
    return (
        <MainContent>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center font-inter p-6">
                {/* Card Container */}
                <div className="flex flex-col lg:flex-row bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-5xl">

                    {/* Left Side Image */}
                    <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center p-6">
                        <img
                            src={loginImage}
                            alt="Login illustration"
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>

                    {/* Right Side Form */}
                    <div className="flex flex-1 items-center justify-center p-10">
                        <div className="w-full max-w-md space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">Login to SyncUp</h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    Welcome back! Please enter your credentials.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Username */}
                                <input
                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    {...register("username", { required: "Username is required" })}
                                    className={`w-full rounded-xl border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.username ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="Enter your username"
                                />
                                {errors.username && (

                                    <span className="m-2 text-[12px] text-red-600">User Name is Requrired </span>
                                )
                                }

                                {/* Password */}
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    {...register("password", { required: "Password is required" })}
                                    className={`w-full rounded-xl border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.password ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="Enter your password"
                                />

                                {
                                    error && (
                                        <span className="mt-1 ml-1 text-xs text-red-500">
                                            {error}
                                        </span>
                                    )
                                }

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white rounded-xl py-2 text-sm font-medium hover:bg-blue-700 transition shadow-md"
                                >
                                    Login
                                </button>
                            </form>

                            <p className="text-sm text-center text-gray-500">
                                Don’t have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </MainContent>

    );
};