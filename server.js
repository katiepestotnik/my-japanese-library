//Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
//middleware connect
const middleware = require('./utils/middleware');
middleware(app);
//home
app.get('/', (req, res) => {
    res.render('index.ejs');
});
//listener
const PORT = process.env.PORT;
app.listen((PORT), () => {
    console.log(`Listening on ${PORT}`);
});