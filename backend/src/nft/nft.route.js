/*const express = require("express");
const router = express.Router();
const { claimNFT } = require("./nft.controller");

// Define route for claiming NFT
router.post("/claim", claimNFT); 

const { getAllNFTs, getNFTsByUser, getNFTByTokenId } = require("./nft.controller");

router.get("/all", getAllNFTs);
router.get("/user/:email", getNFTsByUser);
router.get("/:tokenId", getNFTByTokenId);


// Test route (check if the API is working)
router.get("/", (req, res) => {
    res.send("NFT API is working!");
});

module.exports = router;*/

const express = require("express");
const router = express.Router();
const { claimNFT, getAllNFTs, getNFTsByUser, getNFTById } = require("./nft.controller");
const  protect  = require("../middleware/verifyUserToken"); // assumes you have JWT middleware

// 🛡️ Secure claim route
router.post("/claim", protect, claimNFT);

router.get("/all", getAllNFTs);
router.get("/user/:email", getNFTsByUser);
router.get("/:id", getNFTById);

// Health check
router.get("/", (req, res) => {
  res.send("NFT API is working!");
});

module.exports = router;


