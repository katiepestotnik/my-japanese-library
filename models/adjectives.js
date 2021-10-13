const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const adjectivesSchema = new Schema({
    english: String,
    hiragana: String,
    kanji: String,
    katakana: String,
    memorized: Boolean,
    username: String
});
const Adjective = model("Adjective", adjectivesSchema);
module.exports = Adjective;