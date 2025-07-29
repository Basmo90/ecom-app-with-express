const pool = require('../../../db');
const queries = require('./queries');

// Get all customers
const getCustomers = (req, res) => {
    pool.query(queries.getCustomers, (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results.rows);
    });
};

// Get customer by ID
const getCustomerById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCustomerById, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.rows.length === 0) return res.status(404).send('Customer not found');
        res.status(200).json(results.rows[0]);
    });
};

// Add customer
const addCustomer = (req, res) => {
    const { user_id, name, address } = req.body;
    pool.query(queries.checkCustomerExists, [name, address, user_id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.rows.length > 0) return res.status(400).send('Customer already exists');
        pool.query(queries.addCustomer, [user_id, name, address], (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(201).send(`Customer added for user_id: ${user_id}, name: ${name}`);
        });
    });
};

// Delete customer
const deleteCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCustomerById, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.rows.length === 0) return res.status(404).send('Customer not found');
        pool.query(queries.deleteCustomer, [id], (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(200).send(`Customer deleted with ID: ${id}`);
        });
    });
};

// Edit customer
const editCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, address } = req.body;
    pool.query(queries.getCustomerById, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.rows.length === 0) return res.status(404).send('Customer not found');
        pool.query(queries.editCustomer, [name, address, id], (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(200).send(`Customer modified with ID: ${id}`);
        });
    });
};

module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    deleteCustomer,
    editCustomer,
};