const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userDetails: {
        username: String,
        address: String,
        email: String,
        phone: String
    },
    cartItems: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            title: String,
            price: Number,
            quantity: Number,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    totalPrice: String,
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
