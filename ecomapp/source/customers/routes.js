const {Router} = require('express');
const controller = require('./controller');

const router = Router();

//get all customers
router.get('/', controller.getCustomers);

//add a customer
router.post('/', controller.addCustomer);

//get a customer by id
router.get('/:id', controller.getCustomerById);

//edit a customer that already exists with a PUT request
router.put('/:id', controller.editCustomer);

//delete a customer by id - the route is the /:id
//same route as the get request, but the method is different.
router.delete('/:id', controller.deleteCustomer);


module.exports = router;