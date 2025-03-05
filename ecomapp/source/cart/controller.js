const pool = require('../../../db');
const queries = require('./queries');

const getCartByCustomerId = async (requestAnimationFrame,res) => {
    pool.query(queries.getCartByCustomerId, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const addProduct = async (req, res) => {
    const {id, product_name, customer_id} = req.body;
    //add customer
    pool.query(queries.addProduct, [id, product_name, customer_id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Product added added with ID + name: ${id}: ${product_name}`);
    });
};

const removeProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0) {
            res.status(400).send('Product not found');
        }
    });
    pool.query(queries.removeProduct, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Product ${product_name} deleted with ID: ${id}`);
    });
};


module.exports = {
    getCartByCustomerId,
    addProduct,
    removeProduct,   
};