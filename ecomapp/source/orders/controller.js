const pool = require('../../../db');
const queries = require('./queries');

// Get all orders for a user (order history)
const getOrdersByUserId = (req, res) => {
    const user_id = req.params.user_id;
    pool.query(queries.getOrdersByUserId, [user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result.rows);
    });
};

// Get details of a specific order
const getOrderById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getOrderById, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
        res.json(result.rows[0]);
    });
};

// Add a new order (usually handled by checkout, but included for completeness)
const addOrder = (req, res) => {
    const { user_id } = req.body;
    pool.query(queries.addOrder, [user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ orderId: result.rows[0].id });
    });
};

// Delete an order
const deleteOrder = (req, res) => {
    const id = req.params.id;
    pool.query(queries.deleteOrder, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: `Order deleted with ID: ${id}` });
    });
};

module.exports = {
    getOrdersByUserId,
    getOrderById,
    addOrder,
    deleteOrder,
};