import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart, HiOutlineHome } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import './css/Navbar.css';
const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
];
const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {
            await logout(); // Handles both Firebase and custom inside the context
            setIsDropdownOpen(false); // Close dropdown on logout
            navigate("/"); // Redirect after logout
        } catch (err) {
            console.error("Logout error:", err);
        }
    };
    
      
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            alert('Please enter a book name.');
            return;
        }
        try {
            // Calling the /api/book/search api
            const response = await fetch(`http://localhost:5002/api/books/search?q=${searchTerm}`);
            if (!response.ok) {
                if (response.status === 404) {
                    alert('Book not available');
                } else {
                    throw new Error('Search failed');
                }
                return;
            }
            const data = await response.json();
            //Check the page
            if (Array.isArray(data) && data.length > 0) {
                navigate(`/books/${data[0]._id}`);
            } else {
                // Display an alert if the book isn't found
                alert('Book not found');
            }
        } catch (error) {
            console.error('Search failed:', error);
            alert('An error occurred while searching. Please try again.');
        }
    };
    return (
        <header className="navbar-container">
            <nav className="navbar">
                {/* Left side */}
                <div className="navbar-left">
  <Link to="/" className="home-button">
    <HiOutlineHome className="home-icon" />
  </Link>
                    {/* Search input */}
                    <div className="search-container">
                        <IoSearchOutline className="search-icon" />
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder="Search here"
                                className="search-input"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </form>
                    </div>
                </div>
                {/* Right side */}
                <div className="navbar-right">
                    <div className="avatar-container">
                        {currentUser ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="avatar-btn">
                                    <img
                                        src={avatarImg}
                                        alt="User Avatar"
                                        className={`avatar-image ${currentUser ? 'avatar-ring' : ''}`}
                                    />
                                </button>
                                {/* Dropdown menu */}
                                {isDropdownOpen && (
                                    <div className="avatar-dropdown">
                                        <ul className="dropdown-list">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <Link
                                                        to={item.href}
                                                        className="dropdown-item"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogOut}
                                                    className="dropdown-item logout-btn"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) :  (
                            <Link to="/login" className="login-link">
                                <HiOutlineUser className="user-icon" />
                            </Link>
                        )}
                    </div>
                    <button className="wishlist-btn">
                        <HiOutlineHeart className="wishlist-icon" />
                    </button>
                    <Link to="/cart" className="cart-link">
                        <HiOutlineShoppingCart className="cart-icon" />
                        <span className="cart-item-count">
                            {cartItems.length > 0 ? cartItems.length : 0}
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};
export default Navbar;
