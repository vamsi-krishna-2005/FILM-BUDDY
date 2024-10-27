const mongoose = require('mongoose')
const { isAdmin } = require('../middleware/auth')

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
    },
    isAdmin: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)
