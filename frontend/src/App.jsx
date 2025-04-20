import React, { useContext } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { AuthContext } from './context/AuthContext'; // 👈 add this

import './index.css';

const App = () => {
  const { loading } = useContext(AuthContext); // 👈 use real auth loading state

  if (loading) return <Loading />;

  return (
    <div className="app min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default App;
