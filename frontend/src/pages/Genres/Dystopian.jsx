
import React from 'react';
 // Create a Dystopian.css file
import "./css/Dystopian.css"
import WatchMeShowcase from "../../components/sub/WatchMeShowcase";
import DystopianHeader from "../../components/sub/DystopianHeader";
import DystopianRecommend from './ExploreMore/Dystopian';
import { Link } from "react-router-dom";
const Dystopian = () => {
  return (
    <div className="dystopian-page-container"> {/* Added this container */}
      <DystopianHeader />
      <WatchMeShowcase />
      <DystopianRecommend />
      
    </div>
  );
};

export default Dystopian;






