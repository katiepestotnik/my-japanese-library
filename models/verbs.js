const mongoose = require('./connection');
const { Schema, model } = mongoose;
const verbsSchema = new Schema({
    english: String,
    hiragana: String,
    kanji: String,
    katakana: String,
    memorized: Boolean,
    username: String
});
const Verb = model("Verb", verbsSchema);
module.exports = Verb;