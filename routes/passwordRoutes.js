const express = require('express')
const router = express.Router()
const passwordsController = require('../controllers/passwordsController')

router.post('/add', passwordsController.savePassword)
router.post('/get', passwordsController.getPassword)
router.delete('/delete', passwordsController.deletePassword)

module.exports = router