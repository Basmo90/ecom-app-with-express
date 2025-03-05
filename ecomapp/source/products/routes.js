const {Router} = require('express');
const controller = require('./controller');

const router = Router();

//get all products
router.get('/', controller.getProducts);

//add a product
router.post('/', controller.addProduct);

//get a product by id
router.get('/:id', controller.getProductById);

//edit a product that already exists with a PUT request
router.put('/:id', controller.editProduct);

//delete a product by id - the route is the /:id
//same route as the get request, but the method is different.
router.delete('/:id', controller.deleteProduct);


module.exports = router;

//order of routes is important, the first route that matches the request is the one that is used.
//if the delete route was before the get route, the delete route would be used for the get request.

//first step is to create the route, then create the controller, then create the queries, then create the model.