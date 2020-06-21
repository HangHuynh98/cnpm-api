const adminRouter = require("express").Router();
const { requiredAdmin } = require("../../middlewares/auth");

adminRouter.get("/countTotal",requiredAdmin,require("./countTotal")); 
adminRouter.get("/countNewsByMonth",requiredAdmin,require("./countNewsByMonth")); 

module.exports = {adminRouter};