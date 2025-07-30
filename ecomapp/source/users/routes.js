const {Router} = require('express');
const controller = require('./controller');

const router = Router();

//get all users
router.get('/', controller.getUsers);

//add a user
router.post('/', controller.addUser);

//get a user by id
router.get('/:id', controller.getUserById);

//edit a user that already exists with a PUT request
router.put('/:id', controller.editUser);

//delete a user by id - the route is the /:id
//same route as the get request, but the method is different.
router.delete('/:id', controller.deleteUser);

module.exports = router;
//order of routes is important, the first route that matches the request is the one that is used.
//if the delete route was before the get route, the delete route would be used for the get request.

//first step is to create the route, then create the controller, then create the queries, then create the model.
//this is the same structure as the products routes, just for users.