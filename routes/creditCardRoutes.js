const express = require('express')
const router = express.Router()
const creditCardController = require('../controllers/creditCardController')

router.post('/add', creditCardController.saveCreditCard)

module.exports = router