const mongoose = require('./connection');
const { Schema, model } = mongoose;
const nounsSchema = new Schema({
    english: String,
    hiragana: String,
    kanji: String,
    katakana: String,
    memorized: Boolean,
    username: String
});
const Noun = model("Noun", nounsSchema);
module.exports = Noun;