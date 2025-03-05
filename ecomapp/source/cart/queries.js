

const getCartByCustomerId = 'SELECT * FROM cart WHERE id = $1';

const addProduct = 'INSERT INTO cart (id, Product_name) VALUES ($1, $2)';
const removeProduct = 'REMOVE FROM cart WHERE id = $1';


module.exports = {
   getCartByCustomerId,
   addProduct,
   removeProduct,
};