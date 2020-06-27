const Schema = require("mongoose").Schema; 

const userInfoSchema = new Schema({
  id_account: { type: Schema.Types.ObjectId, required: true },
  address: String,
  gender:Boolean,
  phoneNumber:String,
  avatar:String,
  createdDay: { type: Date, default: Date.now }
});

module.exports = userInfoSchema;
