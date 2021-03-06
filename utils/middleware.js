require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const methodOverride = require('method-override');
const NounRouter = require('../controllers/nouns');
const UserRouter = require('../controllers/user');
const HomeRouter = require('../controllers/home');
const VerbRouter = require('../controllers/verbs');
const AdjectiveRouter = require('../controllers/adjectives');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const middleware = (app) => {
    app.use(morgan("tiny"));
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.use(express.static('public'));
    app.use(session({
        secret: process.env.SECRET,
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
        saveUninitialized: true,
        resave: false
    }));
    app.use('/nouns', NounRouter);
    app.use('/user', UserRouter);
    app.use('/home', HomeRouter);
    app.use('/verbs', VerbRouter);
    app.use('/adjectives', AdjectiveRouter);
};
module.exports = middleware;