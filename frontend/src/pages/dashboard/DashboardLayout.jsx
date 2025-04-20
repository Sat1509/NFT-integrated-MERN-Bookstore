import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { FaUser, FaSignOutAlt, FaHome } from 'react-icons/fa'; // Import FaHome icon
import './css/DashboardLayout.css';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const sidebarRef = useRef(null);



    useEffect(() => {
        function handleClickOutside(event) {
            if (
                isSidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(false);
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
    };

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <section className="dashboard-section">
           <aside 
  ref={sidebarRef}
  className={`dashboard-aside ${isSidebarOpen ? 'active' : ''}`}>
  
  <div className="aside-top">
    <a href="/" className="home-logo-link">
      <FaHome className="home-logo-icon" />
    </a>
    <nav className="dashboard-nav">
      <Link to="/dashboard" className="nav-item active">
        <span className="sr-only">Dashboard</span>
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="nav-icon">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </Link>
      <Link to="/dashboard/add-new-book" className="nav-item">
        <span className="sr-only">Add Book</span>
        <HiViewGridAdd className="nav-icon" />
      </Link>
      <Link to="/dashboard/manage-books" className="nav-item">
        <span className="sr-only">Manage Books</span>
        <MdOutlineManageHistory className="nav-icon" />
      </Link>
    </nav>
  </div>

  <div className="aside-bottom">
    <button className="settings-button">
      <span className="sr-only">Settings</span>
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="settings-icon">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
  </div>
</aside>

            <div className="dashboard-content">
                <header className="dashboard-header">
                <button
    className="menu-button"
    onClick={() => setIsSidebarOpen(prev => !prev)}
>
    <span>Menu</span>
    <i className="fa-solid fa-bars"></i>

                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="menu-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </button>
                    <div className="user-info">
                        <div className="user-section">
                            <FaUser className="user-avatar" />
                            <div className="user-details">
                                <span className="user-name">Author</span>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt className="logout-icon" />
                            Logout
                        </button>
                    </div>
                </header>

                <main className="dashboard-main">
                    <div className="dashboard-header-main">
                        <div className="dashboard-title">
                            <h1 className="main-title">Dashboard</h1>
                            <h2 className="sub-title">Book Store Inventory</h2>
                        </div>
                        <div className="dashboard-buttons">
                            {/* Manage Normal Books */}
                            <Link to="/dashboard/manage-books" className="manage-books-link">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="link-icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Manage Books
                            </Link>

                            {/* Add Normal Book */}
                            <Link to="/dashboard/add-new-book" className="add-new-book-link">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="link-icon white-icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add New Book
                            </Link>

                            {/* Add Special Edition Book */}
                            <Link to="/dashboard/add-special-edition" className="add-special-edition-book-link">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="link-icon white-icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Special Edition Book
                            </Link>

                            {/* Manage Special Edition Books */}
                            <Link to="/dashboard/manage-special-editions" className="manage-special-edition-book-link">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="link-icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Manage Special Edition Books
                            </Link>
                        </div>
                    </div>
                    <Outlet />
                </main>
            </div>
        </section>
    );
};

export default DashboardLayout;
