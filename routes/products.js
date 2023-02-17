const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

/* Get all the products */
router.get('/', productController.handleGetProducts);

/* Get all the products by userID */
router.get('/:userId', productController.handleGetProductByUserId);

/* Get Published products */
router.get('/published', productController.handleGetPublishedProducts);

/* Submit the Product */
router.post('/', productController.handlePostProduct);

/* Submit the Post by User */
// router.post('/:userId', productController.handlePostProductByUser);

/* Update the Post */
router.put('/:productId', productController.handleUpdateProduct);

/* Get Specific Product by Id */
router.get('/:productId', productController.handleGetProductById);

/* Update the Product by user id */
router.put(
    '/:userId/:productId',
    productController.handleUpdateProductByUserId
);

/* Delete the Product */
router.delete('/:productId', productController.handleDeleteProductById);

/* Delete all the Product */
router.delete('/', productController.handleDeleteAllProducts);

module.exports = router;
