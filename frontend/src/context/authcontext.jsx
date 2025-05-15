import axios from "axios";
import React, { useEffect } from "react";
import { useState } from 'react';
import { createContext } from "react";
import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

const userContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    // const navigate = useNavigate();
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("CHecking whether token is there in frontend or not");
                console.log("Stored token:", localStorage.getItem('token'));

                if (token) {
                    console.log("hi da");
                    const response = await axios.get("http://localhost:3000/api/auth/verify", {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    });
                    // console.log(response);
                    // console.log("hi da");
                    if (response.data.success) {
                        setUser(response.data.user);
                    }
                } else {
                    // navigate('/login');
                    setUser(null);
                }
            } catch (error) {
                console.log(error);
                // if (error.response && !error.response.data.error) {
                    // navigate('/login');
                    setUser(null);
                    setloading(false);
                // }
            } finally {
                setloading(false);
            }
        };
        verifyUser();
    }, []);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </userContext.Provider>
    );
};

export const useAuth = () => useContext(userContext);
export default AuthContext;
