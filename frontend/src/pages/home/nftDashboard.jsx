import React, { useContext, useEffect, useState } from 'react';
import {
  useGetNFTOrdersByUserEmailQuery,
  useGetClaimedNFTsByUserEmailQuery,
  useDeleteNFTOrderMutation, 
} from '../../redux/features/nfts/nftOrdersApi';

import { ethers } from 'ethers';

import { useClaimNFTMutation,
  useGetNFTsByUserQuery,
  useGetNFTByIdQuery,
 } from '../../redux/features/nfts/nftApi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './css/NFTDashboard.css';

import { useDispatch } from 'react-redux';
import nftApi from '../../redux/features/nfts/nftApi';
import nftOrdersApi from '../../redux/features/nfts/nftOrdersApi';
import { mintNFT } from '../../utils/connectContract'; // Updated import



const NFTDashboard = () => {
  const { currentUser, token } = useContext(AuthContext);
  const [ready, setReady] = useState(false);
  const [deleteNFTOrder] = useDeleteNFTOrderMutation();
  const [claimNFTMutation, { isLoading: isClaiming }] = useClaimNFTMutation(); // <-- Hook for claiming NFTs
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && token) {
      const timeout = setTimeout(() => setReady(true), 350);
      return () => clearTimeout(timeout);
    }
  }, [currentUser, token]);

  if (!currentUser || !token) {
    return (
      <div className="nft-prompt-container">
        <div className="nft-prompt-box">
          <h2>Please log in to view your NFT dashboard.</h2>
          <Link to="/login" className="nft-login-link">Go to Login</Link>
        </div>
      </div>
    );
  }

  const {
    data: nftOrders = [],
    isLoading: ordersLoading,
    isError: ordersError,
    refetch: refetchOrders
  } = useGetNFTOrdersByUserEmailQuery(undefined, {
    skip: !ready,
    keepUnusedDataFor: 10,
  });
  
  const {
    data: claimedNFTs = [],
    isLoading: claimedLoading,
    isError: claimedError,
    refetch: refetchClaimed
  } = useGetClaimedNFTsByUserEmailQuery(undefined, {
    skip: !ready,
    keepUnusedDataFor: 10,
  });
  
  const {
    data: walletNFTs = [],
    isLoading: walletLoading,
    isError: walletError
  } = useGetNFTsByUserQuery(currentUser?.email, {
    skip: !ready || !currentUser?.email,
    keepUnusedDataFor: 10
  });
  
  
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this unclaimed NFT?");
    if (confirmed) {
      try {
        const res = await deleteNFTOrder(id).unwrap();
        alert(res.message || "Deleted");
      } catch (err) {
        alert(err?.data?.message || "Error deleting NFT order");
      }
    }
  };

  const getBookDetails = async (bookId) => {
    try {
      const response = await fetch(`https://nft-integrated-mern-bookstore-6mvs.vercel.app/api/special-edition/${bookId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }
      const book = await response.json();
      return { bookTitle: book.title, author: book.author };
    } catch (error) {
      console.error("Error fetching book details:", error);
      throw error;
    }
  };
  



  const handleClaimNFT = async (order) => {
    const walletAddress = prompt("Please enter your wallet address:");
    if (!walletAddress) return;
  
    if (!walletAddress.startsWith("0x") || walletAddress.length !== 42) {
      alert("Invalid wallet address. Please enter a valid Ethereum address.");
      return;
    }
  
    // ✅ Make sure order and required fields exist
    if (!order || !order._id || !order.bookId || !order.tokenURI) {
      console.error("Invalid order object:", order);
      alert("Missing or incomplete order details. Cannot mint NFT.");
      return;
    }
  
    try {
      // Step 1: Fetch book details
      const { bookTitle, author } = await getBookDetails(order.bookId);
      if (!bookTitle || !author) {
        alert("Failed to fetch book details. Please try again.");
        return;
      }
  
      // Step 2: Mint the NFT
      const { tokenId, txHash } = await mintNFT(walletAddress, order.tokenURI, bookTitle, author);
      console.log("Transaction confirmed:", txHash);
      console.log("Minted token ID:", tokenId);
  
      // Step 3: Tell backend this NFT has been claimed
      const res = await claimNFTMutation({
        orderId: order._id,
        walletAddress,
        txHash,
        tokenId
      }).unwrap();
  
      alert(res.message || "NFT Claimed Successfully");
  
      // Step 4: Refetch UI data
      dispatch(nftApi.util.invalidateTags(['NFTs']));
      dispatch(nftOrdersApi.util.invalidateTags(['NFTOrders']));
  
      alert(`Minting successful! Transaction hash: ${txHash}`);
    } catch (error) {
      console.error("Error during claim and mint:", error);
      alert(`Error claiming NFT: ${error?.message || "Something went wrong"}`);
    }
  };
  

  if (!ready || ordersLoading || claimedLoading) return <div className="loading">Loading your NFTs...</div>;
  if (ordersError || claimedError) return <div className="error">Error fetching NFT orders.</div>;

  if (!nftOrders || nftOrders.length === 0) {
    return (
      <div className="nft-prompt">
        <h2>Purchase a Special Edition to unlock exclusive NFT content!</h2>
        <Link to="/special-editions" className="browse-link">Browse Special Editions</Link>
      </div>
    );
  }

  return (
    <div className="nft-dashboard">
      <div className="dashboard-box">
        <h2 className="section-title">Your NFT Dashboard</h2>

        <div className="section">
          <h3>Unclaimed NFT Orders</h3>
          <div className="nft-scroll">
            {nftOrders.filter(order => !order.claimed).map(order => (
              <div key={order._id} className="nft-card unclaimed">
                <h4>{order.bookTitle}</h4>
                <p>Author: {order.author}</p>
                <p>Metadata: {order.tokenURI}</p>
                <p className="status pending">Status: Pending</p>
                <button
                  className="claim-btn"
                  onClick={() => handleClaimNFT(order)}
                  disabled={isClaiming} // Disable if claiming is in progress
                >
                  {isClaiming ? "Claiming..." : "Claim NFT"}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(order._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>


        <div className="section">
  <h3>Claimed NFTs</h3>
  <div className="nft-scroll">
    {claimedNFTs.map(order => (
      <div key={order._id} className="nft-card claimed">
        <h4>{order.bookTitle}</h4>
        <p>Author: {order.author}</p>
        <p>Metadata: {order.tokenURI}</p>

        <div className="nft-details-fallback">
          <p><strong>Wallet Address:</strong> {order.walletAddress || "Not available"}</p>
          <p><strong>Txn Hash:</strong> {order.transactionHash || "Not available"}</p>
          
          {order.transactionHash ? (
            <a
              href={`https://sepolia.etherscan.io/tx/${order.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="etherscan-link"
            >
              View on Etherscan →
            </a>
          ) : (
            <p>Etherscan link not available</p>
          )}
        </div>
      </div>
    ))}
  </div>
</div>



      </div>
    </div>
  );
};

export default NFTDashboard;
