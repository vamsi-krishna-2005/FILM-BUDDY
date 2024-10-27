const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true , serverSelectionTimeoutMS: 30000})
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error('Failed to connect to MongoDB', err)
    }
}

module.exports = connectDB
