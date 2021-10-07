//dependencies
require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

//Connect with Mongoose
const db = mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
db.on('open', () => console.log("Connected to Mongo"));
db.on('close', () => console.log("Disconnect from Mongo"));
db.on('error', (err) => console.log(err));

module.exports = mongoose