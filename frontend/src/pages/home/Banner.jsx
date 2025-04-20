import React from 'react';
import banner from "../../assets/banner.png";
import './css/Banner.css';

const Banner = () => {
    return (
        <div className="banner-container">
            {/* Left Section */}
            <div className="banner-text">
                <h1 className="banner-heading">New Releases this week</h1>
                <p className="banner-intro">
                    It's time to update your reading list with some of the latest and greatest 
                    releases in the literary world. From heart-pumping thrillers to captivating 
                    memoirs, this week's new releases offer something for everyone.
                </p>
                <button className="banner-button">Subscribe now</button>
            </div>

            {/* Right Section */}
            <div className="banner-image">
                <img src={banner} alt="banner" />
            </div>
        </div>
    );
};

export default Banner;
