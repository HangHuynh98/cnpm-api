const mongoose= require("mongoose");
module.exports = mongoose.model("permission", require("./shema"),'permission');