import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

import './css/Register.css'

const Register = () => {
  const [message, setMessage] = useState("");
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Register user
  const onSubmit = async (data) => {
    try {
      // If your registerUser supports username, include it here
      await registerUser(data.email, data.password, data.username);
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      setMessage("Please provide a valid email, username, and password");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Google sign in failed!");
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Please Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              placeholder="Email Address"
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
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          {message && <p className="error-text">{message}</p>}

          <button type="submit" className="button">Register</button>
        </form>

        <p className="bottom-text">
          Have an account? Please <Link to="/login">Login</Link>
        </p>

        <div>
          <button
            onClick={handleGoogleSignIn}
            className="google-button"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="bottom-text">©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Register;
