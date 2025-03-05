

const getCustomers = 'SELECT * FROM customers';
const getCustomerById = 'SELECT * FROM customers WHERE id = $1';
const checkCustomerExists = 'SELECT * FROM customers WHERE first_name = $1 AND last_name = $2 AND email = $3';
const addCustomer = 'INSERT INTO customers (id, first_name, last_name, email, password, address) VALUES ($1, $2, $3, $4, $5, $6)';
const deleteCustomer = 'DELETE FROM customers WHERE id = $1';
const editCustomer = 'UPDATE customers SET first_name = $1, last_name = $2, email = $3 WHERE id = $4';

module.exports = {
    getCustomers,
    getCustomerById,
    checkCustomerExists,
    addCustomer,
    deleteCustomer,
    editCustomer,
};