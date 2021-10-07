//Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const methodOverride = require('method-override');
const PORT = process.env.PORT
const mongoose = require('mongoose');
//Middleware
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static('public'));

//Connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('open', () => console.log('Connect to Mongo'));
db.on('close', () => console.log("Mongo disconnected"));
db.on('error', (err) => console.log(err));
//Models
const { Schema, model } = mongoose;
const nounsSchema = new Schema({
    english: String,
    hiragana: String,
    kanji: String,
    katakana: String,
    memorized: Boolean
});
const Noun = model("Noun", nounsSchema);

app.get('/', (req, res) => {
    res.send('server running');
});
app.get('/nouns/seed', (req, res) => {
    const starterNouns = [
        { english: "teacher", hiragana: "せんせい", kanji: "先生", katakana: "no katakana", memorized: false },
        { english: "apple", hiragana: "りんご", kanji: "林檎", katakana: "リンゴ", memorized: true },
        { english: "strawberry", hiragana: "いちご", kanji: "苺", katakana: "イチゴ", memorized: true }
    ];
    Noun.deleteMany({}, (err, data) => {
        Noun.create(starterNouns, (err, data) => {
            res.json(data);
        });
    });
});
//noun index
app.get('/nouns/', (req, res) => {
    Noun.find({}, (err, nouns) => {
        res.render("nouns/index.ejs", { nouns });
    });
});
//noun new
app.get('/nouns/new', (req, res) => {
    res.render('nouns/new.ejs');
});
//noun update
app.put('/nouns/:id', (req, res) => {
    const { id } = req.params;
    req.body.memorized = req.body.memorized === "on" ? true : false;
    Noun.findByIdAndUpdate(id, req.body, { new: true }, (err, noun) => {
        res.redirect('/nouns');
    });
});
//noun create
app.post('/nouns/', (req, res) => {
    req.body.memorized = req.body.memorized === "on" ? true : false;
    Noun.create(req.body, (err, noun) => {
        res.redirect('/nouns');
    });
});
//noun edit
app.get('/nouns/:id/edit', (req, res) => {
    const { id } = req.params;
    Noun.findById(id, (err, noun) => {
        res.render('nouns/edit.ejs', { noun });
    });
});
//noun show
app.get('/nouns/:id', (req, res) => {
    const { id } = req.params;
    Noun.findById(id, (err, noun) => {
        res.render('nouns/show.ejs', { noun });
    });
});

app.listen((PORT), () => {
    console.log(`Listening on ${PORT}`)
});