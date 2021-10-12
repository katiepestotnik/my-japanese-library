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
//adjective destroy
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Adjective.findByIdAndRemove(id, (err, adjective) => {
        res.redirect('/adjectives');
    });
});
//adjective update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    req.body.memorized = req.body.memorized === "on" ? true : false;
    Adjective.findByIdAndUpdate(id, req.body, { new: true }, (err, adjective) => {
        res.redirect('/adjectives');
    });
});
//adjective create
router.post('/', (req, res) => {
    req.body.memorized = req.body.memorized === "on" ? true : false;
    req.body.username = req.session.username;
    Adjective.create(req.body, (err, adjective) => {
        res.redirect('/adjectives');
    });
});
//adjective show
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Adjective.findById(id, (err, adjective) => {
        res.render('adjectives/show.ejs', { adjective });
    });
});
module.exports = router;