const SpecialEdition = require("../specialEditions/specialEdition.model");
const NFTOrder = require("../nftOrder/nftOrder.model");
const NFT = require("./nft.model");
const { mintNFT } = require("../utils/mintNFT");
const { getBlockchain, getTokenIdFromTx } = require("../utils/getBlockchain");
 // Adjust the import based on your project structure


// 🧾 GET /all - Return all NFTs
exports.getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find();
    res.status(200).json(nfts);
  } catch (error) {
    console.error("Error fetching all NFTs:", error);
    res.status(500).json({ error: "Failed to fetch NFTs" });
  }
};

// 👤 GET /user/:email - NFTs by user email
exports.getNFTsByUser = async (req, res) => {
  try {
    const { email } = req.params;
    const nfts = await NFT.find({ email }); // if you saved email in NFT model

    // If your model uses walletAddress instead of email, you'll need to adjust:
    // const userOrders = await NFTOrder.find({ email });
    // const walletAddresses = userOrders.map(order => order.walletAddress);
    // const nfts = await NFT.find({ walletAddress: { $in: walletAddresses } });

    res.status(200).json(nfts);
  } catch (error) {
    console.error("Error fetching NFTs by user:", error);
    res.status(500).json({ error: "Failed to fetch user's NFTs" });
  }
};

// 🆔 GET /:tokenId - NFT by token ID
exports.getNFTById = async (req, res) => {
  try {
   // GET /nft/:id

  const { id } = req.params;
  const nft = await NFT.findById(id);

  if (!nft) return res.status(404).json({ error: "NFT not found" });

  res.status(200).json(nft);
}
 catch (error) {
    console.error("Error fetching NFT by tokenId:", error);
    res.status(500).json({ error: "Failed to fetch NFT" });
  }
};


// Claim NFT endpoint
// Claim NFT endpoint
exports.claimNFT = async (req, res) => {
  try {
    const { orderId, bookId, walletAddress, txHash, tokenId } = req.body;

    if (!walletAddress || (!orderId && !bookId) || !txHash) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // Locate order
    let order;
    if (orderId) {
      order = await NFTOrder.findOne({ _id: orderId });
    } else {
      order = await NFTOrder.findOne({ email: userEmail, bookId, claimed: false });
    }

    if (!order || order.claimed) {
      return res.status(400).json({ error: "No unclaimed NFT order found or already claimed" });
    }

    // Auth ownership check
    if (order.email !== userEmail) {
      return res.status(403).json({ error: "Unauthorized to claim this NFT" });
    }

    // Fetch book details
    const finalBookId = bookId || order.bookId;
    const book = await SpecialEdition.findById(finalBookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Prepare NFT document
    let newNFT;
    if (tokenId === null || tokenId === undefined) {
      
      newNFT = new NFT({
        bookId: finalBookId,
        walletAddress,
        transactionHash: txHash,
        email: userEmail
      });
    } else {
      newNFT = new NFT({
        tokenId: Number(tokenId), // Ensure tokenId is numeric
        bookId: finalBookId,
        walletAddress,
        transactionHash: txHash,
        email: userEmail
      });
    }

    // Update order status
    order.claimed = true;
    order.walletAddress = walletAddress;
    order.transactionHash = txHash;

    // Use MongoDB transactions for atomicity
    const session = await NFTOrder.startSession();
    try {
      await session.withTransaction(async () => {
        await newNFT.save({ session });
        await order.save({ session });
      });
    } catch (error) {
      console.error("Transaction error:", error);
      throw error;
    } finally {
      await session.endSession();
    }
    

    return res.status(200).json({
      message: "NFT claimed successfully!",
      txHash: txHash
    });

  } catch (error) {
    console.error("Error claiming NFT:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
