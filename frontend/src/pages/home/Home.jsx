import React from 'react'
import Banner from './Banner.jsx'
import TopSellers from './TopSellers.jsx'
import Recommend from './Recommend.jsx'
import News from './News.jsx'
import bestsellers from './Bestsellers.jsx'
import GenreSection from "../../components/sub/GenreSection.jsx";  
import BlockchainDashboard from './SpecialEditions.jsx'
import Bestsellers from './Bestsellers.jsx'
import Trending from './TrendingBooks.jsx'
import BookReviews from './BookReviews.jsx'
import SpecialEditions from './SpecialEditions.jsx'
import NFTDashboard from './nftDashboard.jsx'
const Home = () => {
  return (
    <>
        <Banner/>
        <TopSellers/>
        <Recommend/>
        <GenreSection/>        
        <SpecialEditions />
        <NFTDashboard />
        <Trending />
    </>
  )
}

export default Home