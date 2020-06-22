const mongoose = require('mongoose');
const Schema = require("mongoose").Schema;
const CommentSchema = new mongoose.Schema({
    id_account: String,
    id_news: String,
    nameWriter:String,
    comment:String,
    createDay: { type: Date, default: Date.now }
});

module.exports= mongoose.model("Comment", CommentSchema,'comments');