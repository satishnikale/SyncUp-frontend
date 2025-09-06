import { useNavigate } from "react-router-dom";
import withAuth from "../utils/withAuth.tsx";
import { useState } from "react";
import { History, LogOut, Video } from "lucide-react";
import { useAuth } from "../contexts/authContext.tsx";
import videoCallJoin from "../assets/login-img.png";


function Home() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useAuth();

    let handleJoinVideoCall = async () => {
        const username = localStorage.getItem("username");
        alert(username);
        if (!username) return;
        await addToUserHistory(username, meetingCode);
        navigate(`/video-meet/${meetingCode}`);
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Video className="h-8 w-8 text-indigo-600" />
                    <h2 className="text-2xl font-bold text-gray-800">SyncUp</h2>
                </div>

                <div className="flex items-center space-x-6">
                    <button
                        onClick={() => navigate("/history")}
                        className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                        <History className="h-5 w-5" />
                        <span className="font-medium">History</span>
                    </button>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                        className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row items-center justify-between bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
                    {/* Left Panel */}
                    <div className="w-full lg:w-1/2 p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                            Providing Quality Video Call Just Like Quality Education
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                            <input
                                type="text"
                                onChange={e => setMeetingCode(e.target.value)}
                                placeholder="Enter Meeting Code"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            />
                            <button
                                onClick={handleJoinVideoCall}
                                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
                            >
                                Join Meeting
                            </button>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 flex justify-center items-center p-8 md:p-12">
                        <div className="max-w-xs md:max-w-md">
                            <img
                                src={videoCallJoin}
                                alt="Video Call Illustration"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Home)