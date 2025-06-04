import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import axios from 'axios';

import { signOut } from "firebase/auth";



const axiosInstance = axios.create({
  baseURL: 'https://nft-integrated-mern-bookstore-6mvs.vercel.app', // Correct backend URL
});

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Get Firebase ID token
      const idToken = await user.getIdToken();
  
      // Send token to backend
      const res = await axiosInstance.post('/api/auth/firebase-login', { idToken });
  
      // Store your app's JWT and user info
      const { token: appToken, user: appUser } = res.data;
      localStorage.setItem("userToken", appToken);
      localStorage.setItem("userDetails", JSON.stringify(appUser));
      setToken(appToken);
      setCurrentUser({ ...appUser, authType: "firebase" });
  
      alert("Google login successful!");
      navigate("/");
    } catch (error) {
      alert("Google sign in failed!");
      console.error(error);
    }
  };
  
  

  // Custom Login
  const loginCustom = async ({ email, username, password }) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", { email, username, password });
      const { token: customToken, user } = res.data;

      localStorage.setItem("userToken", customToken);
      localStorage.setItem("userDetails", JSON.stringify(user));

      setToken(customToken);
      console.log("Custom login user:", user);
      setCurrentUser({ ...user, authType: "custom" });
      
  

    } catch (error) {
      console.error("Custom Login Error:", error);
      throw error;
    } finally {
      setLoading(false); // ← ends loading no matter what
    }
  };

  const logoutFirebase = async () => await signOut(auth);


  const logoutCustom = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userDetails");
  };

  const clearAuthState = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userDetails");
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };
  
  const logout = async () => {
    const authType = currentUser?.authType;
    clearAuthState();
    if (authType === "firebase") {
      await logoutFirebase();
    }
  };
  

  const registerUser = async (email, password, username) => { 
    try {
      const response = await axiosInstance.post('/api/auth/register', {
        email,
        password,
        username,
      });
      return response.data; // return success data
    } catch (error) {
      console.error("Registration failed", error.response ? error.response.data : error.message);
      // Throw error to be caught in Register component
      throw error.response?.data || new Error('Registration failed');
    }
  };
  

  useEffect(() => {
    const restoreSession = async () => {
      const customToken = localStorage.getItem("userToken");
  
      let customLoginRestored = false;
  
      if (customToken) {
        try {
          const res = await axios.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${customToken}` }
          });
          const { user } = res.data;
          setToken(customToken);
          console.log("Custom login user:", user);
          setCurrentUser({ ...user, authType: "custom" });
          customLoginRestored = true; // ✅ mark as restored
        } catch (err) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("userDetails");
        }
      }


  
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const firebaseToken = await user.getIdToken();
          setToken(firebaseToken);
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            authType: "firebase",
          });
        } else if (!customToken) {
          // No firebase, no custom
          setCurrentUser(null);
        }
  
        setLoading(false); // ✅ Firebase path loading end
      });
  
      if (!auth.currentUser && customLoginRestored) {
        // ✅ Custom login was used and Firebase is irrelevant
        setLoading(false);
      }
  
      return () => unsubscribe();
    };
  
    restoreSession();
  }, []);
  

  const value = {
    currentUser,
    token,
    loading,
    signInWithGoogle,
    registerUser,
    loginCustom,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
