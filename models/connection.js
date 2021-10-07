//dependencies
require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

//Connect with Mongoose
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection
.on('open', () => console.log("Connected to Mongo"))
.on('close', () => console.log("Disconnect from Mongo"))
.on('error', (err) => console.log(err));

module.exports = mongoose