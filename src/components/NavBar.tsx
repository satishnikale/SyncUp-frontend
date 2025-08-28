import { useState } from "react";
import { MainContent } from "./MainContent";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <MainContent >
            <div className="w-full bg-lightGray border border-slate-400 rounded-full font-inter my-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 py-3">

                    {/* Logo */}
                    <div className="text-lg font-semibold">SyncUp</div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-6 text-sm font-medium">
                        <li className="cursor-pointer hover:text-blue-600 transition">Join as Guest</li>
                        <li className="cursor-pointer hover:text-blue-600 transition">Register</li>
                        <li className="cursor-pointer hover:text-blue-600 transition">Login</li>
                    </ul>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition"
                    >
                        {isOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white w-11/12 max-w-sm rounded-2xl p-6 shadow-lg relative">

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-black transition"
                            >
                                ✕
                            </button>

                            {/* Menu Items */}
                            <ul className="flex flex-col gap-6 text-lg font-medium text-center">
                                <li className="cursor-pointer hover:text-blue-600 transition">Join as Guest</li>
                                <li className="cursor-pointer hover:text-blue-600 transition">Register</li>
                                <li className="cursor-pointer hover:text-blue-600 transition">Login</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

        </MainContent>
    )
}