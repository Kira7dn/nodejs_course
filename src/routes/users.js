const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
router.get('/', userController.show);
router.get('/create', userController.create);
router.post('/store', userController.store);

module.exports = router;