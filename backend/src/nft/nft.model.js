const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema(
  {
    tokenId: { type: Number, required: false}, // ✅ Unique NFT token ID
    bookId: { type: String, required: true }, // ✅ Special edition book ID
    walletAddress: { type: String, required: true }, // ✅ Minted to this address
    email: { type: String }, // ✅ User's email for tracking
    transactionHash: { type: String, required: true }, // ✅ Blockchain transaction hash

  },
  { timestamps: true } // ✅ Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("NFT", nftSchema);
