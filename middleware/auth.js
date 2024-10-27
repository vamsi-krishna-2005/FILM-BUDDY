const express = require("express")

const router = express.Router()

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

<<<<<<< HEAD
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    return res.redirect('/login'); // Redirect to login if not an admin
}


router.get('/upload', isAdmin, (req, res) => {
=======
function checkAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

router.get('/upload', checkAdmin, (req, res) => {
>>>>>>> 5c64ad7d335ec1c6cbad6af605c00cc65055c806
    res.render('upload');  // Only accessible by admins
});

module.exports = {
    checkAuthenticated,
<<<<<<< HEAD
    checkNotAuthenticated,
    isAdmin
=======
    checkNotAuthenticated
>>>>>>> 5c64ad7d335ec1c6cbad6af605c00cc65055c806
}
