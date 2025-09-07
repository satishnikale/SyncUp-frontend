import axios from "axios";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";

// Define the shape of AuthContext
interface AuthContextType {
    userData: any;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    handleRegister: (name: string, username: string, password: string) => Promise<any>;
    handleLogin: (username: string, password: string) => Promise<void>;
    getHistoryOfUser: (username: string) => Promise<any>;
    addToUserHistory: (username: string, meetingCode: string) => Promise<any>;
}

// Create Context with correct type
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fix axios baseURL
const client = axios.create({
    baseURL: "http://localhost:3000/api/v1/users",
});

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<any>(null);
    const router = useNavigate();

    const handleRegister = async (name: string, username: string, password: string) => {
        try {
            const res = await client.post("/signup", { name, username, password });
            if (res.status === httpStatus.CREATED) {
                router("/login");
                return res.data.messages;
            }
        } catch (error) {
            throw error;
        }
    };

    const handleLogin = async (username: string, password: string) => {
        try {
            const req = await client.post("/signin", { username, password });
            if (req.status === httpStatus.OK) {
                localStorage.setItem("token", req.data.token);
                localStorage.setItem("username", username);
                router("/home");
            }
        } catch (error) {
            throw error;
        }
    };

    const getHistoryOfUser = async (username: string) => {
        try {
            let request = await client.get("/getAllActivity", {
                params: {
                    username: username
                }
            });
            return request.data;
        } catch (e) {
            throw e;
        }
    }

    const addToUserHistory = async (username: string, meetingCode: string): Promise<any> => {
        try {
            // For POST requests, send data directly in the body (not in params)
            const response = await client.post("/addToActivity", {
                username: username,
                meetingCode: meetingCode
            });
            alert("data added to history");
            return response.data;
        } catch (e) {
            console.error("Error adding to history:", e);
            throw e;
        }
    }

    const value: AuthContextType = {
        userData,
        setUserData,
        handleRegister,
        getHistoryOfUser,
        addToUserHistory,
        handleLogin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for safer usage
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useLogin must be used within an AuthProvider");
    }
    return context;
};