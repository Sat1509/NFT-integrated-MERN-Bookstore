const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const nftOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, default: () => uuidv4(), unique: true }, // ✅ Auto-generate unique order ID
    email: { type: String, required: true }, // ✅ Store user's email
    bookId: { type: String, required: true }, // ✅ Store special edition book ID
    tokenURI: { type: String, required: true }, // ✅ Required for minting NFT
    bookTitle: { type: String, required: true }, // ✅ Required for minting NFT
    author: { type: String, required: true }, // ✅ Required for minting NFT
    claimed: { type: Boolean, default: false }, // ✅ NFT claim status
    walletAddress: { type: String, default: null }, // ✅ Wallet address (null until claimed)
    transactionHash: { type: String, default: null } // ✅ Add this

    

  },
  { timestamps: true } // ✅ Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("NFTOrder", nftOrderSchema);
