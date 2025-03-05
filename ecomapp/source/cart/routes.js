const {Router} = require('express');
const controller = require('./controller');

const router = Router();

//get all cart
//router.get('/', controller.getCart);

//add a product
router.post('/', controller.addProduct);

//get a cart by customer by id
router.get('/:id', controller.getCartByCustomerId);


//delete a product from cart by id - the route is the /:id
//same route as the get request, but the method is different.
router.delete('/:id', controller.removeProduct);


module.exports = router;