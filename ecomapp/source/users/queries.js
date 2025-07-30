const getUsers = 'SELECT * FROM users';
const addUser = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)';
const getUserById = 'SELECT * FROM users WHERE id = $1';
const editUser = 'UPDATE users SET username = $1, email = $2 WHERE id = $3';
const deleteUser = 'DELETE FROM users WHERE id = $1';

module.exports = {
    getUsers,
    addUser,
    getUserById,
    editUser,
    deleteUser,
};