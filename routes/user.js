const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const ROLES_LIST = require('../config/roles');
const verifyRoles = require('../middleware/verifyRoles');

router.post('/', verifyRoles(ROLES_LIST.Admin), userController.handleNewUser);

router.put(
    '/:userId',
    verifyRoles(ROLES_LIST.Admin),
    userController.handleUpdateUser
);

module.exports = router;
