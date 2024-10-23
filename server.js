require('dotenv').config()
const express = require('express')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const connectDB = require('./config/db')
const initializePassport = require('./config/passport-config')

const app = express()

// Connect to MongoDB
connectDB()

// Initialize Passport
initializePassport(passport)

// Express configurations
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use((req, res, next)=> {
    res.locals.user = req.user || null
    next()
})

// Routes
app.use('/', require('./routes/index'))
app.use('/', require('./routes/auth'))

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/')
})
