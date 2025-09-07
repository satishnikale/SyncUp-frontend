import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { Home } from 'lucide-react';

interface Meeting {
    meetingCode: string;
    Date: Date;
    duration?: number; // Optional property
    // Add other properties that might exist in your meeting objects
}

export default function History() {
    const { getHistoryOfUser } = useAuth();
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const username = localStorage.getItem("username");
                if (!username) return;
                const history = await getHistoryOfUser(username);
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
                console.error('Failed to fetch history');
            }
        };

        fetchHistory();
    }, [getHistoryOfUser]);

    const formatDate = (input: any) => {
        if (!input) return "—"; // or "Invalid Date"

        const date = input instanceof Date ? input : new Date(input);

        if (isNaN(date.getTime())) return "Invalid Date";

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };




    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter p-4 md:p-6 font-inter">
            {/* Header with back button */}
            <div className="flex items-center mb-6 md:mb-8">
                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors p-2 rounded-lg hover:bg-indigo-50"
                >
                    <Home className="h-4 w-4 mr-2" />
                    <span className="font-sm">Home</span>
                </button>
            </div>

            {/* Page title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
                Meeting History
            </h1>

            {/* Meetings list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {meetings.length > 0 ? (
                    meetings.map((e, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
                        >
                            <div className="p-4 md:p-6">
                                <div className="mb-3">
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                        Meeting Code
                                    </p>
                                    <p className="text-lg font-semibold text-indigo-600 truncate">
                                        {e.meetingCode}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                        Date
                                    </p>
                                    <p className="text-md text-gray-700">
                                        {formatDate(e.Date)}
                                    </p>
                                </div>

                                {/* Additional meeting details can be added here */}
                                {e.duration && (
                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Duration
                                        </p>
                                        <p className="text-md text-gray-700">
                                            {e.duration} minutes
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">No meetings yet</h3>
                            <p className="text-gray-500">Your meeting history will appear here once you start having meetings.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}