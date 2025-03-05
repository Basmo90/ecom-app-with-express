const pool = require('../../../db');
const queries = require('./queries');

const getCustomers = async (requestAnimationFrame,res) => {
    pool.query(queries.getCustomers, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getCustomerById = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCustomerById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const addCustomer = async (req, res) => {
    const {id, first_name, last_name, email, password, address} = req.body;
    //check if customer already exists
    pool.query(queries.checkCustomerExists, [first_name, last_name, email], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            res.status(400).send('Customer already exists');
        }
    });
    //add customer
    pool.query(queries.addCustomer, [id, first_name, last_name, email, password, address], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Customer added with ID + name: ${id}: ${first_name} ${last_name}`);
    });
};

const deleteCustomer = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCustomerById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0) {
            res.status(400).send('Customer not found');
        }
    });
    pool.query(queries.deleteCustomer, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Customer deleted with ID: ${id}`);
    });
};

const editCustomer = async (req, res) => {
    const id = parseInt(req.params.id);
    const {first_name, last_name, email, password, address} = req.body;
    pool.query(queries.getCustomerById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0) {
            res.status(400).send('Customer not found');
        }
    });
    pool.query(queries.editCustomer, [first_name, last_name, email, id, address, password], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Customer modified with ID: ${id}`);
    });
};  

module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    deleteCustomer,
    editCustomer,
};