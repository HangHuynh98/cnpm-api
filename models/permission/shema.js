const Schema = require("mongoose").Schema;

const permissionShema = new Schema({
    id_per:{type:String, required: true },
    code:{type:Number},
    name_per:{type:String},
    description:{type:String}
});
module.exports = permissionShema;