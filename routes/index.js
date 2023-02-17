const express = require('express');

const router = express.Router();

const verifyJWT = require('../middleware/verifyJWT');

const productsRoute = require('./products');
const registerRoute = require('./register');
const authRoute = require('./auth');

const app = express();

/* Routes */
app.get('/', (req, res) => {
    res.send('We are on HOME');
});
router.use('/auth', authRoute);

router.use(verifyJWT);

/* Import Routes */
router.use('/users', registerRoute);
router.use('/products', productsRoute);

module.exports = router;
