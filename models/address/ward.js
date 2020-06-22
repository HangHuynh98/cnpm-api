const mongoose = require('mongoose');
const Schema = require("mongoose").Schema;
const WardSchema = new mongoose.Schema({
    code: Number,
    district: Number,
    city: Number,
    title: String,
});

module.exports= mongoose.model("ward", WardSchema,'wards');