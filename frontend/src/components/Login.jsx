import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from "../context/AuthContext"; // Import AuthContext

import getBaseUrl from '../utils/baseURL';
import './css/Login.css';

import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { setCurrentUser, setToken } = useAuth();
    const { loginCustom, signInWithGoogle, currentUser } = useAuth(); // Access auth functions and user

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Custom auth login handler
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/login`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-source': 'custom',
                },
            });

            const authData = response.data;

            if (authData.token) {
                localStorage.setItem("userToken", authData.token);
                localStorage.setItem("userDetails", JSON.stringify(authData.user)); // Store user details


                alert("Login successful!");
                navigate("/");
                setTimeout(() => {
                    window.location.reload();
                  }, 300);

            } else {
                setMessage("Invalid login credentials.");
            }
        } catch (error) {
            setMessage("Please provide valid login credentials");
            console.error(error);
        }
    };

    // Firebase Google Sign-In handler
    const handleGoogleSignIn = async () => {
        try {
            
    
            const provider = new GoogleAuthProvider();
            
    
            const result = await signInWithPopup(auth, provider);
            
    
            const idToken = await result.user.getIdToken();
           
    
            const backendUrl = `${getBaseUrl()}/api/auth/firebase-login`;
            
    
            
            const response = await axios.post(backendUrl, { idToken });
    
            
    
            const authData = response.data;
            
    
            if (authData.token) {
                
                localStorage.setItem("userToken", authData.token);
                localStorage.setItem("userDetails", JSON.stringify(authData.user));
    
                alert("Google login successful!");
               
                navigate("/");
            } else {
               
                setMessage("Google login failed.");
            }
    
        } catch (error) {
            
            if (error.response) {
                
            } else if (error.request) {
                
            } else {
                
            }
            setMessage("Google sign-in failed!");
        }
    };
    

    // Check if user is already logged in on component mount
    useEffect(() => {
        if (localStorage.getItem("userToken") && !currentUser) {
            // If token exists, attempt to refresh user details (optional)
            // This might involve calling /api/auth/me or similar
            console.log("Attempting to refresh user session...");
        }
    }, [currentUser, navigate]); // Re-run when currentUser changes

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Please Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
                            })}
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            className="input-field"
                        />
                        {errors.email && <p className="error-text">{errors.email.message}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            {...register("username", { required: "Username is required" })}
                            type="text"
                            id="username"
                            placeholder="Username"
                            className="input-field"
                        />
                        {errors.username && <p className="error-text">{errors.username.message}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="input-field"
                        />
                        {errors.password && <p className="error-text">{errors.password.message}</p>}
                    </div>

                    {message && <p className="error-text">{message}</p>}

                    <button type="submit" className="submit-button">Login</button>
                </form>

                <p className="register-link">
                    Don't have an account? Please <Link to="/register">Register</Link>
                </p>

                <div className="google-signin">
                    <button onClick={handleGoogleSignIn} className="google-button">
                        <FaGoogle className="google-icon" />
                        Sign in with Google
                    </button>
                </div>

                <p className="login-footer-text">©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Login;
