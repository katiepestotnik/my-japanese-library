const mongoose = require('./connection');
const Noun = require('./nouns');

mongoose.connection.on('open', () => {
    const starterNouns = [
        { english: "teacher", hiragana: "せんせい", kanji: "先生", katakana: "no katakana", memorized: false },
        { english: "apple", hiragana: "りんご", kanji: "林檎", katakana: "リンゴ", memorized: true },
        { english: "strawberry", hiragana: "いちご", kanji: "苺", katakana: "イチゴ", memorized: true }
    ];
    Noun.deleteMany({}, (err, data) => {
        Noun.create(starterNouns, (err, data) => {
            console.log("Recreated");
            console.log(data);
            mongoose.connection.close();
        });
    });
});