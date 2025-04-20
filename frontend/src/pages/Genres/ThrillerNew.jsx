import React, { useRef } from 'react';
import Thriller from './Thriller'
import ThrillerRecommend from './ExploreMore/ThrillerRecommend';
import { Link } from "react-router-dom";

const ThrillerNew = () => {
  const recommendRef = useRef(null);

  const scrollToRecommend = () => {
    recommendRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Thriller onUnravelClick={scrollToRecommend} />
      <div ref={recommendRef}>
        <ThrillerRecommend />
      </div>
    </div>
  );
};

export default ThrillerNew;
