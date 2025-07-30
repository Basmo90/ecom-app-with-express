const { Router } = require('express');
const controller = require('./controller');

const router = Router();

/**
 * @swagger
 * /api/cart/{user_id}:
 *   get:
 *     summary: Get cart for a user
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart items for the user
 */
router.get('/:user_id', controller.getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add product to cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product added to cart
 */
router.post('/', controller.addProduct);

router.put('/', controller.updateCartItem);
router.delete('/', controller.removeProduct);

module.exports = router;