const express = require('express');
const Noun = require('../models/nouns');
const router = express.Router();

//Athorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/');
    }
});
//noun index
router.get('/', (req, res) => {
    Noun.find({username: req.session.username}, (err, nouns) => {
        res.render("nouns/index.ejs", { nouns });
    });
});
//noun new
router.get('/new', (req, res) => {
    res.render('nouns/new.ejs');
});
//noun destroy
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Noun.findByIdAndRemove(id, (err, noun) => {
        res.redirect('/nouns');
    });
});
//noun update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    req.body.memorized = req.body.memorized === "on" ? true : false;
    Noun.findByIdAndUpdate(id, req.body, { new: true }, (err, noun) => {
        res.redirect('/nouns');
    });
});
//noun create
router.post('/', (req, res) => {
    req.body.memorized = req.body.memorized === "on" ? true : false;
    req.body.username = req.session.username;
    Noun.create(req.body, (err, noun) => {
        res.redirect('/nouns');
    });
});
//noun edit
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    Noun.findById(id, (err, noun) => {
        res.render('nouns/edit.ejs', { noun });
    });
});
//noun show
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Noun.findById(id, (err, noun) => {
        res.render('nouns/show.ejs', { noun });
    });
});
module.exports = router;