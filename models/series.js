const mongoose = require("mongoose");

const serieSchema = new mongoose.Schema({
    title : String,
    content: String,
    author: String,
    image: String,
});

const article = mongoose.model('serie', serieSchema)

module.exports = article