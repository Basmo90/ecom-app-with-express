const pool = require('../../../db');
const queries = require('./queries');

const getProducts = async (req, res) => {
   pool.query(queries.getProducts, (error, results) => {
         if (error) {
              throw error;
         }
         res.status(200).json(results.rows);
    });
};

const getProductById = async (req, res) => {
    const id = parseInt(req.params.id);//parseInt converts the string to an integer
    pool.query(queries.getProductById, [id], (error, results) => { //the second argument is an array of values to be inserted into the query
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);//returns the first element of the rows array, not to be confused with results
    });
};

const addProduct = async (req, res) => {
    const {id, product_name, price, stock_qty} = req.body;
    //check if product exists
    pool.query(queries.checkProductExists, [product_name], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            res.status(400).send('Product already exists');
        }
    });//if product does not exist, add it...
    pool.query('INSERT INTO products (id, product_name, price, stock_qty) VALUES ($1, $2, $3, $4)', [id, product_name, price, stock_qty], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Product added with ID + name: ${id}: ${product_name}`);
    });
};

const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);//get the id from the request parameters
    
    //if product does not exist, return an error with message
    //if you do not include this the return statement, the code will continue to run and try to delete the product even if it does not exist
    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0) {
            res.status(400).send('Product not found');
        }
    });
    //this logic removes the product if it exists
    pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Product deleted with ID: ${id}`);
    });
};

const editProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const {product_name, price, stock_qty} = req.body;//get the new values from the request body
    //check if product exists
    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0) {
            res.status(400).send('Product not found');
        }

        //if product does exist, update it
        pool.query(queries.editProduct, [product_name, price, stock_qty, id], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`Product modified with ID:name: ${id} ${product_name}`);
        },);
    });
};


module.exports = {
    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
    editProduct,
};