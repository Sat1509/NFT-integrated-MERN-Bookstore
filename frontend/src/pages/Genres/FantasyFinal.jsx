import React, { useRef } from 'react';
import Fantasy from "./Fantasy";
import FantasyRecommend from "./ExploreMore/Fantasy";
import { Link } from "react-router-dom";

const FantasyFinal = () => {
    const recommendRef = useRef(null);

    const scrollToRecommend = () => {
        recommendRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <Fantasy onExploreClick={scrollToRecommend} />
            <div ref={recommendRef}>
                <FantasyRecommend />
                
            </div>
        </div>
    );
}

export default FantasyFinal;
