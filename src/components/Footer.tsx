import {
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram
} from "react-icons/fa";
import { MainContent } from "./MainContent";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <MainContent>
            <footer className="w-full bg-white font-inter py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-10 text-gray-600">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">SyncUp.</h2>
                        <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                            SyncUp is your gateway to effortless, high-quality video
                            conferencing. Join us in shaping the future of communication!
                        </p>
                    </div>


                    {/* Product */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base">Product</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li className="hover:text-gray-900 cursor-pointer">Overview</li>
                            <li className="hover:text-gray-900 cursor-pointer">Features</li>
                            <li className="hover:text-gray-900 cursor-pointer">Solutions</li>
                            <li className="hover:text-gray-900 cursor-pointer">Tutorials</li>
                            <li className="hover:text-gray-900 cursor-pointer">Pricing</li>
                        </ul>
                    </div>


                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base">Company</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li className="hover:text-gray-900 cursor-pointer">About us</li>
                            <li className="hover:text-gray-900 cursor-pointer">Careers</li>
                            <li className="hover:text-gray-900 cursor-pointer">Press</li>
                            <li className="hover:text-gray-900 cursor-pointer">News</li>
                            <li className="hover:text-gray-900 cursor-pointer">Contact</li>
                        </ul>
                    </div>


                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base">Resources</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li className="hover:text-gray-900 cursor-pointer">Blog</li>
                            <li className="hover:text-gray-900 cursor-pointer">Events</li>
                            <li className="hover:text-gray-900 cursor-pointer">Help centre</li>
                            <li className="hover:text-gray-900 cursor-pointer">Tutorials</li>
                            <li className="hover:text-gray-900 cursor-pointer">Support</li>
                        </ul>
                    </div>


                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-base">Legal</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li className="hover:text-gray-900 cursor-pointer">Terms</li>
                            <li className="hover:text-gray-900 cursor-pointer">Privacy</li>
                            <li className="hover:text-gray-900 cursor-pointer">Cookies</li>
                            <li className="hover:text-gray-900 cursor-pointer">Licenses</li>
                            <li className="hover:text-gray-900 cursor-pointer">Contact</li>
                        </ul>
                    </div>
                </div>


                {/* Divider */}
                <div className="max-w-7xl mx-auto mt-12 border-t border-gray-200 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-xs md:text-sm text-center lg:text-left">
                        © 2023 SyncUp. All rights reserved.
                    </p>


                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            to={"#"}
                            className="w-36 h-11 bg-blue-700 rounded-xl flex items-center justify-center text-white text-sm font-medium hover:opacity-90 transition"
                        >
                            App Store
                        </Link>
                        <Link
                            to={"#"}
                            className="w-36 h-11 bg-blue-700 rounded-xl flex items-center justify-center text-white text-sm font-medium hover:opacity-90 transition"
                        >
                            Google Play
                        </Link>
                    </div>
                </div>


                {/* Social Media */}
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 mt-8">
                    <a
                        href="https://www.linkedin.com/in/satishnikale"
                        target="_blank"
                        rel=""
                    >
                        <FaLinkedin className="text-gray-500 hover:text-blue-600 text-2xl cursor-pointer transition" />
                    </a>

                    <a
                        href="https://twitter.com/satish_nikale"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTwitter className="text-gray-500 hover:text-blue-400 text-2xl cursor-pointer transition" />
                    </a>

                    <a
                        href="https://facebook.com/Mr.satish.nikale"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebook className="text-gray-500 hover:text-blue-700 text-2xl cursor-pointer transition" />
                    </a>

                    <a
                        href="https://instagram.com/satish_nikale"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaInstagram className="text-gray-500 hover:text-pink-500 text-2xl cursor-pointer transition" />
                    </a>
                </div>

            </footer>
        </MainContent>
    );
};