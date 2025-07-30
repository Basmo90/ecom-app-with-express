const getOrdersByUserId = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC';
const getOrderById = 'SELECT * FROM orders WHERE id = $1';
const addOrder = 'INSERT INTO orders (user_id, created_at) VALUES ($1, NOW()) RETURNING id';
const deleteOrder = 'DELETE FROM orders WHERE id = $1';
// If you want to update orders, add an update query here

module.exports = {
    getOrdersByUserId,
    getOrderById,
    addOrder,
    deleteOrder,
};