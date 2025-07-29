const getCartByUserId = 'SELECT * FROM cart WHERE user_id = $1';
const addProductToCart = 'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)';
const updateCartItem = 'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3';
const removeProductFromCart = 'DELETE FROM cart WHERE user_id = $1 AND product_id = $2';

module.exports = {
    getCartByUserId,
    addProductToCart,
    updateCartItem,
    removeProductFromCart,
};