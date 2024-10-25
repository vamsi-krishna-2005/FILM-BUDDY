const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/User')
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth')
const router = express.Router()
const flash = require('express-flash')

router.use(flash())

// Login Route
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})

router.post('/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // Error occurred during authentication
        }
        if (!user) {
           return res.render('login', { message: 'Password Not Matched'});
            // Flash the error message
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Error occurred during login
            }
            req.session.user = {
                id: user.id, 
                name: user.name, 
                email: user.email
            };

            res.redirect('/'); // Successful login
        });
    })(req, res, next);
});


// Register Route
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    const { name, email, password, confirmpassword} = req.body
    if(password != confirmpassword)
    {
        return res.render('register', { message: 'Passwords did not match', name, email });
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const isAdmin = email === 'adminuser@example.com'
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin
        })
        await user.save()
        res.redirect('/login')
    } catch (err) {
        console.error('Error during registration:', err)
        res.redirect('/register')
    }
})

// Logout Route
router.post('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');  // After logging out, redirect to the home page
    });
});


module.exports = router
