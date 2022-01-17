const express = require('express');
const router = express.Router();
const controller = require('../controller/indexController');

router.get('/', controller.user.getUser);
router.post('/register', controller.user.register);
router.post('/login', controller.user.login);
router.put('/update', controller.user.updateUser)

module.exports= router;