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
            const req = await client.post("/signup", { name, username, password });
            if (req.status === httpStatus.CREATED) {
                router("/login");
                return req.data.messages;
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
                router("/");
            }
        } catch (error) {
            throw error;
        }
    };

    const value: AuthContextType = {
        userData,
        setUserData,
        handleRegister,
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

export const useRegister = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useRegister must be used within an AuthProvider");
    }
    return context;
}