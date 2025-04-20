import React, { useState } from "react";
import "./ClaimNFTModal.css"; // We'll create this file next
import { useClaimNFTMutation } from "../nftApi";
import { toast } from "react-toastify";

const ClaimNFTModal = ({ isOpen, onClose, orderId, bookId }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [claimNFT, { isLoading }] = useClaimNFTMutation();

  const handleClaim = async () => {
    if (!walletAddress) {
      toast.error("Please enter a wallet address");
      return;
    }

    try {
      const payload = {
        walletAddress,
        ...(orderId ? { orderId } : { bookId })
      };

      const res = await claimNFT(payload).unwrap();
      toast.success(`NFT claimed! Token ID: ${res.tokenId}`);
      onClose(); // Close the modal after success
    } catch (err) {
      console.error("Claim failed:", err);
      toast.error(err?.data?.error || "Failed to claim NFT");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="claim-modal-overlay">
      <div className="claim-modal">
        <h2>Claim Your NFT</h2>
        <label htmlFor="wallet">Wallet Address:</label>
        <input
          type="text"
          id="wallet"
          placeholder="0xABC123..."
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />

        <div className="buttons">
          <button onClick={handleClaim} disabled={isLoading}>
            {isLoading ? "Claiming..." : "Claim NFT"}
          </button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ClaimNFTModal;
