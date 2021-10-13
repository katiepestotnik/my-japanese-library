//Dependencies
require('dotenv').config();
const express = require('express');
const middleware = require('./utils/middleware');
const app = express();
middleware(app);
const PORT = process.env.PORT;
//home
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.listen((PORT), () => {
    console.log(`Listening on ${PORT}`);
});