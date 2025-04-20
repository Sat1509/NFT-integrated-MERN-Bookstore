import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiZap } from "react-icons/fi";

import { useGetSpecialEditionByIdQuery } from '../../redux/features/nfts/SpecialEditionApi';
import { getImgUrl } from '../../utils/getImgUrl';
import './css/SingleSpecialEdition.css';


import { addToCart } from '../../redux/features/cart/cartSlice'; // ✅ make sure this line is included


const SingleSpecialEdition = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: book, isLoading, isError } = useGetSpecialEditionByIdQuery(id);

  if (isLoading) return <div className="sse-loading">Loading rare edition...</div>;
  if (isError) return <div className="sse-error">Couldn't fetch special edition details.</div>;

  return (
    <div className="sse-container">
      <div className="sse-card">
        <div className="sse-content-wrapper">
          <div className="sse-image-wrapper">
            <img
              src={`${getImgUrl(book.coverImage)}`}
              alt={book.title}
              className="sse-image"
            />
          </div>
          <div className="sse-details">
            <h1 className="sse-title">{book.title}</h1>
            <p className="sse-author"><strong>Author:</strong> {book.author || 'Unknown'}</p>
            <p className="sse-category"><strong>Category:</strong> {book.category}</p>
            <p className="sse-description">{book.description}</p>

            {book.nftMetadata && (
              
              <p className="sse-nft-meta">
              <span>IPFS Link: </span>
              <a href={book.nftMetadata} target="_blank" rel="noopener noreferrer" className="sse-ipfs-link">
                {book.nftMetadata}
              </a>
            </p>
            
            )}

            <p className="sse-price">₹{book.price}</p>

            <button
  className="sse-purchase-btn"
  onClick={() => dispatch(addToCart(book))}
>
  <FiZap /> Add Rare Edition to Cart
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSpecialEdition;
