const pool = require('../../../db');
const queries = require('./queries');

const checkout = async (req, res) => {
    const { user_id, payment_details } = req.body; // payment_details can be optional for now

    try {
        // 1. Validate cart exists
        const cartResult = await pool.query(queries.getCartItems, [user_id]);
        const cartItems = cartResult.rows;
        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty.' });
        }

        // 2. Simulate payment validation
        if (!payment_details || !payment_details.card_number) {
            // For now, just check if payment details exist
            return res.status(400).json({ error: 'Missing payment details.' });
        }

        // 3. Create order
        const orderResult = await pool.query(queries.createOrder, [user_id]);
        const orderId = orderResult.rows[0].id;

        // 4. Create order items
        for (const item of cartItems) {
            await pool.query(queries.createOrderItem, [orderId, item.product_id, item.quantity]);
        }

        // 5. Clear cart
        await pool.query(queries.clearCart, [user_id]);

        res.json({ message: 'Checkout successful!', orderId });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Checkout failed.' });
    }
};

module.exports = { checkout };