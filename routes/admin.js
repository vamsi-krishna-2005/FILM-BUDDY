// routes/admin.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { isAdmin, checkAuthenticated } = require('../middleware/auth');


// Admin Dashboard
// Serve admin dashboard for admin users, redirect to profile for regular users
router.get('/admin', isAdmin, async (req, res) => {
    try {
        // Since isAdmin middleware ensures the user is an admin, we can directly render the admin view
        const podcasts = await Post.find({ type: 'podcast' });
        const courses = await Post.find({ type: 'course' });
        res.render('admin', { podcasts, courses });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Serve profile page for all users, admin included
router.get('/profile', async (req, res) => {
    try {
        if (!req.session.user) {
            // Handle case when user is not logged in or session expired
            return res.status(401).redirect('/login');
        }
        // Render profile page for all users
        const { name, email} = req.session.user;
        res.render('profile', {user: {name, email}}); // Adjust if you want to send different data based on user type
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post('/admin/podcast/delete/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/admin'); // Redirect back to the podcast list
    } catch (error) {
        console.error('Error deleting podcast:', error);
        res.status(500).send('Error deleting podcast');
    }
});

// Delete a course
router.post('/admin/course/delete/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/admin'); // Redirect back to the course list
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send('Error deleting course');
    }
});


module.exports = router;
