const express = require("express");
const router = express.Router();


const {
  getNFTOrdersByUserEmail,
  getClaimedNFTsByUserEmail,
  deleteNFTOrder,
} = require("./nftOrder.controller");
const verifyUserToken = require("../middleware/verifyUserToken");

router.get("/user", verifyUserToken, getNFTOrdersByUserEmail);
router.get("/claimed/user", verifyUserToken, getClaimedNFTsByUserEmail);
router.delete("/:id", verifyUserToken, deleteNFTOrder); // still needs the order ID



module.exports = router;
