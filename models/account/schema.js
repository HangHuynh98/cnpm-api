const Schema = require("mongoose").Schema; 

const accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name:{type:String, require:true},
  hash_password: {
    type: String,
    required: true
  },
  salt_password: {
    type: String,
    required: true
  },
  status: { type: Boolean, default: true },
  isAdmin: {type: Boolean, default: false},
  role: {type:Array , default:[]},
  createdDay: { type: Date, default: Date.now }
});

module.exports = accountSchema;
