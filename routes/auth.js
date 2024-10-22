const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/User')
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth')
const router = express.Router()

// Login Route
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// Register Route
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await user.save()
        res.redirect('/login')
    } catch (err) {
        console.error('Error during registration:', err)
        res.redirect('/register')
    }
})

// Logout Route
router.delete('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/login')
    })
})

module.exports = router
