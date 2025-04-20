// specialEdition.model.js (Model for Special Edition Books)
const mongoose = require('mongoose');

const specialEditionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }, // Added author field
    description: { type: String, required: true },
    category: { type: String, required: true },
    coverImage: { type: String, required: true },
    price: { type: Number, required: true },
    nftMetadata: { type: String, required: false }, // IPFS/Metadata URL
    createdAt: { type: Date, default: Date.now }
});

const SpecialEdition = mongoose.model('SpecialEdition', specialEditionSchema);
module.exports = SpecialEdition;
