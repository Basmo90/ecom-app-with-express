

const getCustomers = 'SELECT * FROM customers';
const getCustomerById = 'SELECT * FROM customers WHERE id = $1';
const checkCustomerExists = 'SELECT * FROM customers WHERE first_name = $1 AND last_name = $2 AND email = $3';
const addCustomer = 'INSERT INTO customers (id, name, address) VALUES ($1, $2, $3)';
const deleteCustomer = 'DELETE FROM customers WHERE id = $1';
const editCustomer = 'UPDATE customers SET name = $1, address= $2, email = $3 WHERE id = $3';

module.exports = {
    getCustomers,
    getCustomerById,
    checkCustomerExists,
    addCustomer,
    deleteCustomer,
    editCustomer,
};