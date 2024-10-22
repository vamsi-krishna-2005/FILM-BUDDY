const express = require('express')
const { checkAuthenticated } = require('../middleware/auth')
const router = express.Router()

// Home Route
router.get('/', checkAuthenticated, (req, res) => {
    res.render('index')
})

module.exports = router
