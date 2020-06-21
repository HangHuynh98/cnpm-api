const mongoose = require('mongoose');
const Schema = require("mongoose").Schema;
const CitySchema = new mongoose.Schema({
    code: Number,
    title: String,
});

module.exports= mongoose.model("City", CitySchema,'cities');