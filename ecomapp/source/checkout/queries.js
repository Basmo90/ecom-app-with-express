const getCartItems = 'SELECT * FROM cart WHERE user_id = $1';
const createOrder = 'INSERT INTO orders (user_id, created_at) VALUES ($1, NOW()) RETURNING id';
const createOrderItem = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)';
const clearCart = 'DELETE FROM cart WHERE user_id = $1';

module.exports = {
    getCartItems,
    createOrder,
    createOrderItem,
    clearCart,
};