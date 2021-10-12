const express = require('express');
const Adjective = require('../models/adjectives');
const router = express.Router();

//Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/');
    }
});

//adjective index
router.get('/', (req, res) => {
    Adjective.find({ username: req.session.username }, (err, adjectives) => {
        res.render('adjectives/index.ejs', { adjectives });
    });
});
//adjective new
router.get('/new', (req, res) => {
    res.render('adjectives/new.ejs');
});

module.exports = router;