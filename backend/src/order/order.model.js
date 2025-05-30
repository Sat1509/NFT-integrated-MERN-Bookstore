const mongoose =  require('mongoose');

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
        city: { type: String, required: true },
        country: String,
        state: String,
        zipcode: String,
    },
    phone: { type: Number, required: true },

    productIds: [  // Regular books
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: false,
        }
    ],

    specialEditionIds: [ // NEW FIELD for NFTs
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SpecialEdition',
            required: false,
        }
    ],

    totalPrice: { type: Number, required: true },
}, {
    timestamps: true,
});


const Order =  mongoose.model('Order', orderSchema);

module.exports = Order;