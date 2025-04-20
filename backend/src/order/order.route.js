const express = require('express');
const verifyUserToken = require("../middleware/verifyUserToken");

const { createAOrder, getMyOrders } = require('./order.controller');

const router =  express.Router();

// create order endpoint
// order.route.js

router.post("/", verifyUserToken, createAOrder);


// get orders by user email 
//router.get("/email/:email", getOrderByEmail);
router.get("/getMyOrders", verifyUserToken, getMyOrders);


module.exports = router;