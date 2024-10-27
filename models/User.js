const mongoose = require('mongoose')
<<<<<<< HEAD
const { isAdmin } = require('../middleware/auth')
=======
>>>>>>> 5c64ad7d335ec1c6cbad6af605c00cc65055c806

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
<<<<<<< HEAD
    },
    isAdmin: {
        type: Boolean,
        required: false
=======
>>>>>>> 5c64ad7d335ec1c6cbad6af605c00cc65055c806
    }
})

module.exports = mongoose.model('User', userSchema)
