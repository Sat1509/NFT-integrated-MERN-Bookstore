import React, { useState } from 'react'
import { useForm } from "react-hook-form"

import axios from "axios"
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'

import './css/AdminLogin.css'

const AdminLogin = () => {
    const [message, setMessage] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const navigate = useNavigate()

      const onSubmit = async (data) => {
        try {
           const response =  await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
           })
           const auth = response.data;
            if(auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has been expired!, Please login again.');
                    navigate("/")
                }, 3600 * 1000)
            }

            alert("Admin Login successful!")
            navigate("/dashboard")

        } catch (error) {
            setMessage("Please provide a valid email and password") 
            console.error(error)
        }
      }
  return (
    <div className='admin-login-container'>
        <div className='login-form'>
            <h2 className='login-header'>Admin Dashboard Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input-group'>
                    <label className='input-label' htmlFor="username">Username</label>
                    <input 
                    {...register("username", { required: true })} 
                    type="text" name="username" id="username" placeholder='username'
                    className='input-field'
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label' htmlFor="password">Password</label>
                    <input 
                    {...register("password", { required: true })} 
                    type="password" name="password" id="password" placeholder='Password'
                    className='input-field'
                    />
                </div>
                {
                    message && <p className='error-message'>{message}</p>
                }
                <div className='button-group'>
                    <button className='submit-button'>Login</button>
                </div>
            </form>

            <p className='footer-text'>©2025 Book Store. All rights reserved.</p>
        </div>
    </div>
  )
}

export default AdminLogin
