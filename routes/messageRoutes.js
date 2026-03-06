const express = require('express');
const router = express.Router();
const { publishMessage } = require('../controllers/messageController');

router.post('/send', publishMessage);

module.exports = router;