const express = require('express');
const Verb = require('../models/verbs');
const router = express.Router();

//Athorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/');
    }
});

//verb index
router.get('/', (req, res) => {
    Verb.find({username: req.session.username}, (err, verbs) => {
        res.render("verbs/index.ejs", { verbs });
    });
});
//verb new
router.get('/new', (req, res) => {
    res.render('verbs/new.ejs');
});
//verb destroy
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Verb.findByIdAndRemove(id, (err, verb) => {
        res.redirect('/verbs');
    });
});
//verb update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    req.body.memorized = req.body.memorized === "on" ? true : false;
    Verb.findByIdAndUpdate(id, req.body, { new: true }, (err, verb) => {
        res.redirect('/verbs')
    });
});
//verb create
router.post('/', (req, res) => {
    req.body.memorized = req.body.memorized === "on" ? true : false;
    req.body.username = req.session.username;
    Verb.create(req.body, (err, verb) => {
        res.redirect('/verbs');
    });
});
//verb edit
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    Verb.findById(id, (err, verb) => {
        res.render('verbs/edit.ejs', { verb });
    });
});
//verb show
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Verb.findById(id, (err, verb) => {
        res.render('verbs/show.ejs', { verb });
    });
});

module.exports = router;