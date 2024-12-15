const express = require('express')
const router = express.Router();
const { auth } = require('../middlewares/Tokenauth')
const { GetAllTheChats } = require('../controllers/AllChats')
const { GetPreviousMessages } = require('../controllers/Messages')

router.get('/', auth , GetAllTheChats);
router.post('/getallmessages', auth, GetPreviousMessages)
module.exports = router;