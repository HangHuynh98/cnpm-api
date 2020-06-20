const adminRouter = require("express").Router();
const router = require("express").Router();
const { requiredLogin ,requiredAdmin,checkRole } = require("../../middlewares/auth");
const {checkRoleUser,checkRoleAdmin } = require('../../middlewares/role')


adminRouter.patch("/changestatusaccountuser/:id", requiredAdmin,checkRoleUser, checkRole, require("./changeStatusAccount"));
adminRouter.patch("/changestatusaccountadmin/:id", requiredAdmin,checkRoleAdmin, checkRole, require("./changeStatusAccount"));
adminRouter.get("/", requiredAdmin,checkRoleUser, checkRole, require("./getListUser"));
adminRouter.get("/getaccountuser/:id",requiredAdmin,checkRoleUser, checkRole,  require("./getAccountById"));
adminRouter.get("/getaccountadmin/:id",requiredAdmin,checkRoleAdmin, checkRole,  require("./getAccountById"));
adminRouter.get("/listadmin",requiredAdmin,checkRoleAdmin, checkRole,require("./getListAdmin"));
adminRouter.patch("/:id", requiredAdmin, require("./changeRole"));

router.patch("/", requiredLogin, require("./changePassword"));

module.exports = { adminRouter, router };
