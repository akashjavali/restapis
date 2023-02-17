const express = require('express');

const router = express.Router();

const registerController = require('../controllers/register');

const ROLES_LIST = require('../config/roles');
const verifyRoles = require('../middleware/verifyRoles');

router.post(
    '/',
    verifyRoles(ROLES_LIST.Admin),
    registerController.handleNewUser
);

router.put(
    '/:userId',
    verifyRoles(ROLES_LIST.Admin),
    registerController.handleUpdateUser
);

module.exports = router;
