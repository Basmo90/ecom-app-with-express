const pool = require('../../../db');
const queries = require('./queries');

// Get all users
const getUsers = (req, res) => {
    pool.query(queries.getUsers, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result.rows);
    });
};

// Add a user
const addUser = (req, res) => {
    const { username, password } = req.body;
    pool.query(queries.addUser, [username, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User added!' });
    });
};

// Get user by ID
const getUserById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getUserById, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(result.rows[0]);
    });
};

// Edit user
const editUser = (req, res) => {
    const id = req.params.id;
    const { username } = req.body;
    pool.query(queries.editUser, [username, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated!' });
    });
};

// Delete user
const deleteUser = (req, res) => {
    const id = req.params.id;
    pool.query(queries.deleteUser, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted!' });
    });
};

module.exports = {
    getUsers,
    addUser,
    getUserById,
    editUser,
    deleteUser,
};