const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/Tokenauth')
const { Adduser } = require('../controllers/Adduser')

router.post('/', auth , Adduser);

module.exports = router;