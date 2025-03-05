// Code for the queries to be used in the products module

const getProducts = 'SELECT * FROM products';
const getProductById = 'SELECT * FROM products WHERE id = $1';
const checkProductExists = 'SELECT * FROM products WHERE product_name = $1';
const addProduct = 
'INSERT INTO products (id, product_name, price, stock_qty) VALUES ($1, $2, $3, $4)';
const deleteProduct = 'DELETE FROM products WHERE id = $1';
const editProduct = 'UPDATE products SET product_name = $1, price = $2, stock_qty = $3 WHERE id = $4';

module.exports = {  
    getProducts, 
    getProductById, 
    checkProductExists, 
    addProduct, 
    deleteProduct,
    editProduct,
};