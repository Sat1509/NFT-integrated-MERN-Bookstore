const Order = require('./order.model');
const NFTOrder = require('../nftOrder/nftOrder.model');
const SpecialEdition = require('../specialEditions/specialEdition.model');

const createAOrder = async (req, res) => {
  try {
    const email = req.user?.email;

    if (!email) {
      return res.status(403).json({ message: "Unauthorized: No email found in token" });
    }

    // Inject the email into the order object from the verified user
    const newOrder = new Order({
      ...req.body,
      email,
    });

    const savedOrder = await newOrder.save();

    // If specialEditionIds exist, create NFTOrder entries
    if (savedOrder.specialEditionIds && savedOrder.specialEditionIds.length > 0) {
      // Fetch details of special editions
      const specialEditions = await SpecialEdition.find({
        _id: { $in: savedOrder.specialEditionIds }
      });

      // Prepare NFTOrder documents
      const nftOrders = specialEditions.map((edition) => ({
        orderId: savedOrder._id.toString(),
        email,
        bookId: edition._id.toString(),
        tokenURI: edition.nftMetadata,  // Make sure this exists in SpecialEdition schema
        bookTitle: edition.title,
        author: edition.author,
        claimed: false,
        walletAddress: null,
        transactionHash: null,
      }));

      // Insert NFTOrder documents
      await NFTOrder.insertMany(nftOrders);
    }

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};




// getMyOrders controller
const getMyOrders = async (req, res) => {
  try {
    const email = req.user.email; // Correct: email is from req.user

    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};



module.exports = {
  createAOrder,
  getMyOrders
};