const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// Get all orders for a user
router.get('/user/:user_id', controller.getOrdersByUserId);

// Get details of a specific order
router.get('/:id', controller.getOrderById);

// Add a new order
router.post('/', controller.addOrder);

// Delete an order
router.delete('/:id', controller.deleteOrder);

module.exports = router;