import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetNFTByIdQuery } from '../redux/features/nfts/nftApi';
import './css/NFTDetails.css';

const NFTDetails = () => {
  const { id } = useParams();
  const { data: nft, isLoading, isError } = useGetNFTByIdQuery(id);

  if (isLoading) return <div className="loading">Loading NFT details...</div>;
  if (isError || !nft) return <div className="error">NFT not found.</div>;

  return (
    <div className="nft-details-page">
      <h2>{nft.bookTitle}</h2>
      <p><strong>Author:</strong> {nft.author}</p>
      <p><strong>Book ID:</strong> {nft.bookId}</p>
      <p><strong>Token URI:</strong> <a href={nft.tokenURI} target="_blank" rel="noopener noreferrer">{nft.tokenURI}</a></p>
      <p><strong>Wallet Address:</strong> {nft.walletAddress}</p>
      <p><strong>Tx Hash:</strong> <a href={`https://etherscan.io/tx/${nft.transactionHash}`} target="_blank" rel="noopener noreferrer">
        {nft.transactionHash?.slice(0, 10)}...
      </a></p>
    </div>
  );
};

export default NFTDetails;
