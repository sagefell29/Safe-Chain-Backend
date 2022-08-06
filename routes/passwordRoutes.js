const express = require('express')
const router = express.Router()
const passwordsController = require('../controllers/passwordsController')

router.post('/add', passwordsController.savePassword)

module.exports = router