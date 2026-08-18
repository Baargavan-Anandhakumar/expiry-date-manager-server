const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../utils/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - amount
 *         - expiryDate
 *       properties:
 *         title:
 *           type: string
 *           description: The product title
 *         upcCode:
 *           type: string
 *           description: The UPC barcode
 *         amount:
 *           type: object
 *           properties:
 *             value:
 *               type: number
 *             currency:
 *               type: string
 *         expiryDate:
 *           type: string
 *           format: date
 *           description: Expiry date of the product
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns the list of products for the logged in user
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or upcCode
 *       - in: query
 *         name: expiresIn
 *         schema:
 *           type: string
 *         description: Filter products expiring within X months
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *       400:
 *         description: Bad request
 */
router.route('/')
    .get(protect, productController.getProducts)
    .post(protect, productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was updated
 *       404:
 *         description: The product was not found
 *   delete:
 *     summary: Delete a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */
router.route('/:id')
    .put(protect, productController.updateProduct)
    .delete(protect, productController.deleteProduct);

module.exports = router;
