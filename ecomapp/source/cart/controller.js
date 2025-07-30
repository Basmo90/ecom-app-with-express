const pool = require('../../../db');
const queries = require('./queries');

// Get cart for a user
const getCart = (req, res) => {
    const user_id = req.params.user_id;
    pool.query(queries.getCartByUserId, [user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result.rows);
    });
};

// Add product to cart
const addProduct = (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    pool.query(queries.addProductToCart, [user_id, product_id, quantity], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product added to cart!' });
    });
};

// Update cart item quantity
const updateCartItem = (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    pool.query(queries.updateCartItem, [quantity, user_id, product_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cart updated!' });
    });
};

// Remove product from cart
const removeProduct = (req, res) => {
    const { user_id, product_id } = req.body;
    pool.query(queries.removeProductFromCart, [user_id, product_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product removed from cart!' });
    });
};

module.exports = {
    getCart,
    addProduct,
    updateCartItem,
    removeProduct,
};