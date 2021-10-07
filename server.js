//Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const methodOverride = require('method-override');
const PORT = process.env.PORT;
const NounRouter = require('./controllers/nouns');
const UserRouter = require('./controllers/user');
// const Noun = require('./models/nouns')
// const mongoose = require('mongoose');
//Middleware
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use('/nouns', NounRouter);
app.use('/user', UserRouter);

//login page
app.get('/', (req, res) => {
    res.render('index.ejs');
});
//home page with links to each model
app.get('/home', (req, res) => {
    res.render("home.ejs");
});

app.listen((PORT), () => {
    console.log(`Listening on ${PORT}`)
});