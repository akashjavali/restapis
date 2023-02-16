const express = require('express');

const router = express.Router();

const Product = require('../models/Product');

/* Get all the products */
router.get('/', async (req, res) => {
    try {
        let query;
        if (req.query.name) {
            query = {
                name: req.query.name,
            };
        }
        const products = await Product.find(query).sort({
            price: 1,
            rating: 1,
        });

        res.json(products);
    } catch (error) {
        res.json(error);
    }
});

/* Get all the products by userID */
router.get('/:userId', async (req, res) => {
    try {
        const products = await Product.find({
            created_by: req.params.userId,
        }).sort({
            price: 1,
            rating: 1,
        });

        res.json(products);
    } catch (error) {
        res.json(error);
    }
});

router.get('/published', async (req, res) => {
    try {
        const products = await Product.find({
            published: true,
        });
        res.json(products);
    } catch (error) {
        res.json(error);
    }
});

/* Submit the Post */
router.post('/', async (req, res) => {
    console.log(req, 'req');
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        published: req.body.published,
        image: req.body.image,
        price: req.body.price,
        rating: req.body.rating,
    });
    const savedProduct = await product.save();
    try {
        res.json(savedProduct);
    } catch (error) {
        res.json({ message: error });
    }
});

/* Submit the Post by User */
router.post('/:userId', async (req, res) => {
    console.log(req, 'req');
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        published: req.body.published,
        image: req.body.image,
        price: req.body.price,
        rating: req.body.rating,
        created_by: req.params.userId,
    });
    const savedProduct = await product.save();
    try {
        res.json(savedProduct);
    } catch (error) {
        res.json({ message: error });
    }
});

/* Specific Product */

router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.json(error);
    }
});

/* Update the Post */
router.put('/:productId', async (req, res) => {
    try {
        const updateProduct = await Product.updateOne(
            {
                _id: req.params.productId,
            },
            {
                name: req.body.name,
                description: req.body.description,
                published: req.body.published,
                image: req.body.image,
                price: req.body.price,
                rating: req.body.rating,
            }
        );
        res.json(updateProduct);
    } catch (error) {
        res.json(error);
    }
});

/* Update the Product by user id */
router.put('/:userId/:productId', async (req, res) => {
    try {
        const updateProduct = await Product.updateOne(
            {
                _id: req.params.productId,
                created_by: req.params.userId,
            },
            {
                name: req.body.name,
                description: req.body.description,
                published: req.body.published,
                image: req.body.image,
                price: req.body.price,
                rating: req.body.rating,
            }
        );
        res.json(updateProduct);
    } catch (error) {
        res.json(error);
    }
});

/* Delete the Product */

router.delete('/:productId', async (req, res) => {
    try {
        const deletedProduct = await Product.remove({
            _id: req.params.productId,
        });
        res.json(deletedProduct);
    } catch (error) {
        res.json(error);
    }
});

/* Delete all the Product */

router.delete('/', async (req, res) => {
    try {
        const deleteAllProducts = await Product.remove({});
        res.json(deleteAllProducts);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
