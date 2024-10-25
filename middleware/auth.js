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

function checkAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

router.get('/upload', checkAdmin, (req, res) => {
    res.render('upload');  // Only accessible by admins
});

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
}
