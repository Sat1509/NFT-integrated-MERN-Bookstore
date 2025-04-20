const NFTOrder = require("./nftOrder.model");
const getBlockchain = require("../utils/getBlockchain");

exports.getNFTOrdersByUserEmail = async (req, res) => {
  try {
    const email = req.user.email;
    const orders = await NFTOrder.find({ email });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

exports.getClaimedNFTsByUserEmail = async (req, res) => {
  try {
    const email = req.user.email;
    const claimedNFTs = await NFTOrder.find({ email, claimed: true });
    res.json(claimedNFTs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching claimed NFTs", error });
  }
};

exports.deleteNFTOrder = async (req, res) => {
  try {
    const order = await NFTOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.claimed) {
      return res.status(403).json({ message: "Claimed NFTs cannot be deleted." });
    }

    await NFTOrder.findByIdAndDelete(req.params.id);
    res.json({ message: "NFT order deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting NFT order", error });
  }
};



/*exports.deleteNFTOrder = async (req, res) => {
  try {
    await NFTOrder.findByIdAndDelete(req.params.id);
    res.json({ message: "NFT order deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting NFT order", error });
  }
};*/

