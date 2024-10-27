require('dotenv').config()
const express = require('express')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const connectDB = require('./config/db')
const initializePassport = require('./config/passport-config')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const { isAdmin } = require('./middleware/auth')
const app = express()

// Connect to MongoDB
connectDB()

// Initialize Passport
initializePassport(passport)

// Express configurations
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(express.json())
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
app.use('/', require('./routes/podcast'))
app.use('/', require('./routes/upload'))
app.use('/', require('./routes/admin'))
app.use('/', require('./routes/course'))

const createAdminIfNotExists = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Logging to check values
    console.log('Admin Email:', adminEmail);
    console.log('Admin Password:', adminPassword);

    // Check if the email and password are defined
    if (!adminEmail || !adminPassword) {
        console.error('Admin email or password is not defined in environment variables.');
        return;
    }

    let user = await User.findOne({ email: adminEmail });

    if (!user) {
        try {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            user = new User({
                name: 'Admin',
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true
            });
            await user.save();
            console.log('Admin user created');
        } catch (error) {
            console.error('Error creating admin user:', error);
        }
    } else {
        console.log('Admin user already exists');
    }
};


createAdminIfNotExists();


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/')
})
