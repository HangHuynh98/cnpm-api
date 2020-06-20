const adminRouter = require("express").Router();
const router = require("express").Router();
const { requiredLogin ,requiredAdmin,checkRole } = require("../../middlewares/auth");
const {checkRoleUser,checkRoleAdmin } = require('../../middlewares/role')


adminRouter.patch("/changestatusaccountuser/:id", requiredAdmin, require("./changeStatusAccount"));
adminRouter.patch("/changestatusaccountadmin/:id", requiredAdmin, require("./changeStatusAccount"));
adminRouter.get("/", requiredAdmin, require("./getListUser"));
adminRouter.get("/getaccountuser/:id",requiredAdmin, require("./getAccountById"));
adminRouter.get("/getaccountadmin/:id",requiredAdmin,  require("./getAccountById"));
adminRouter.get("/listadmin",requiredAdmin,require("./getListAdmin"));
adminRouter.patch("/:id", requiredAdmin, require("./changeRole"));

router.patch("/", requiredLogin, require("./changePassword"));

module.exports = { adminRouter, router };
