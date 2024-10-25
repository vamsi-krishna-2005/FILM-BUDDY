// routes/course.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Render the course page
router.get('/course', async (req, res) => {
    const courses = await Post.find({ type: 'course' }); // Get only 'course' type
    res.render('course', { courses });
});

module.exports = router;
