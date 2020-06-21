const mongoose = require('mongoose');
const Schema = require("mongoose").Schema;
const DistrictSchema = new mongoose.Schema({
    code: Number,
    city: Number,
    title: String,
});

module.exports= mongoose.model("District", DistrictSchema,'districts');