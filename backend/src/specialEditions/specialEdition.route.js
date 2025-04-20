const express = require('express');
const router = express.Router();
const { 
    createSpecialEdition, 
    getSpecialEditions, 
    purchaseSpecialEdition,
    getSpecialEditionById,
    updateSpecialEdition,
    deleteSpecialEdition
} = require('./specialEdition.controller');

const verifyAdminToken = require('../middleware/verifyAdminToken'); // For admin-only routes

// Admin: Create a new special edition book
router.post('/', verifyAdminToken, createSpecialEdition);

// Public: Get all special edition books
router.get('/', getSpecialEditions);

router.get('/:id', getSpecialEditionById);


const verifyUserToken = require('../middleware/verifyUserToken');

router.post('/purchase', verifyUserToken, purchaseSpecialEdition);

// ✅ Fixed route definitions
router.put('/update-book/:id', verifyAdminToken, updateSpecialEdition);
router.delete('/delete/:id', verifyAdminToken, deleteSpecialEdition);


module.exports = router;
