const Product = require('../models/Product');

/* Get all the products */
const handleGetProducts = async (req, res) => {
    const { page = 1 } = req.query;
    const { limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    try {
        let query;
        if (req.query.name) {
            query = {
                name: req.query.name,
            };
        }
        const products = await Product.find(query)
            .sort({
                price: 1,
                rating: 1,
            })
            .skip(startIndex)
            .limit(limit);

        res.json(products);
    } catch (error) {
        res.json(error);
    }
};

/* Get all the products by userID */
const handleGetProductByUserId = async (req, res) => {
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
};

/* Get Published products */
const handleGetPublishedProducts = async (req, res) => {
    try {
        const products = await Product.find({
            published: true,
        });
        res.json(products);
    } catch (error) {
        res.json(error);
    }
};

/* Submit the Product */
const handlePostProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        published: req.body.published,
        image: req.body.image,
        price: req.body.price,
        rating: req.body.rating,
        created_by: req.user.id,
    });
    const savedProduct = await product.save();
    try {
        res.json(savedProduct);
    } catch (error) {
        res.json({ message: error });
    }
};

const handleUpdateProduct = async (req, res) => {
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
};

/* Get Specific Product by Id */
const handleGetProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.json(error);
    }
};

/* Update the Product by user id */
const handleUpdateProductByUserId = async (req, res) => {
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
};

/* Delete the Product */
const handleDeleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.remove({
            _id: req.params.productId,
        });
        res.json(deletedProduct);
    } catch (error) {
        res.json(error);
    }
};

/* Delete all the Product */
const handleDeleteAllProducts = async (req, res) => {
    try {
        const deleteAllProducts = await Product.remove({});
        res.json(deleteAllProducts);
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    handleGetProducts,
    handleGetProductByUserId,
    handleGetPublishedProducts,
    handlePostProduct,
    handleUpdateProduct,
    handleGetProductById,
    handleUpdateProductByUserId,
    handleDeleteProductById,
    handleDeleteAllProducts,
};
