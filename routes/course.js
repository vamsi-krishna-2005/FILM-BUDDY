<<<<<<< HEAD
=======
// routes/course.js
>>>>>>> 5c64ad7d335ec1c6cbad6af605c00cc65055c806
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

<<<<<<< HEAD
// Function to extract YouTube video ID from the URL
function extractYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Render the course page
router.get('/course', async (req, res) => {
    const courses = await Post.find({ type: 'course' });
    courses.forEach(course => {
        course.VideoId = extractYouTubeVideoId(course.link);
    });
    res.render('course', { courses });
});

// Route for uploading a new course
router.post('/course/upload', async (req, res) => {
    const { title, content, link } = req.body;
    const newPost = new Post({ title, content, link, type: 'course' });
    await newPost.save();
    res.redirect('/admin/course'); // Redirect to course list
});

// Additional routes for editing and deleting can be added here

=======
// Render the course page
router.get('/course', async (req, res) => {
    const courses = await Post.find({ type: 'course' }); // Get only 'course' type
    res.render('course', { courses });
});

>>>>>>> 5c64ad7d335ec1c6cbad6af605c00cc65055c806
module.exports = router;
