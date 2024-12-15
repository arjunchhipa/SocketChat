const express = require('express');
const router = express.Router();
const { userlogin , usersignup , redirectauth} = require('../controllers/Authorisation')
const { auth } = require('../middlewares/Tokenauth')

router.post("/", auth , redirectauth);
router.post("/login", userlogin);
router.post("/signup", usersignup);

module.exports = router;