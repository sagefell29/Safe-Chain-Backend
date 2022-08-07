const express = require('express')
const router = express.Router()
const creditCardController = require('../controllers/creditCardController')

router.post('/add', creditCardController.saveCreditCard)
router.post('/get', creditCardController.getCreditCards)
router.delete('/delete', creditCardController.deleteCreditCard)

module.exports = router