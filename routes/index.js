const express = require('express')
const router = express.Router()
const CartItem = require('../models/CartItems')
const Order = require('../models/Order')
// Home Route
router.get('/', (req, res) => {
    res.render('index')
})


router.post('/add-to-cart', async (req, res) => {
    try {
        console.log(req.body); // Log the request body for debugging
        
        const { title, price, quantity } = req.body;

        if ( !title || !price || !quantity) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: 'User not logged in' });
        }

        const cartItem = new CartItem({
            userId: req.session.user.id,
            title,
            price,  // This should now be a number
            quantity
        });
        console.log('Session in /add-to-cart:', req.session); // Check if user session is present
        await cartItem.save();
        res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding item to cart:', error); // Log the error
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
});

router.get('/products', async(req, res)=> {
    try {
        const products = await CartItem.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Assuming you already have an "Order" model for saving orders
router.post('/orders', async (req, res) => {
    try {
        const { userDetails, cartItems, totalPrice } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'No items in cart.' });
        }

        // Save the order details in the Orders collection
        const newOrder = new Order({
            userDetails,
            cartItems,
            totalPrice,
            orderDate: new Date()
        });
        await newOrder.save();

        // Clear the user's cart after order is placed
        await CartItem.deleteMany({ userId: req.user.id });

        res.status(200).json({ message: 'Order placed successfully and cart cleared!' });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order.' });
    }
});


module.exports = router
