const adminRouter = require("express").Router();
const router = require("express").Router();
const { requiredLogin ,requiredAdmin,checkRole } = require("../../middlewares/auth");
const {checkRoleUser,checkRoleAdmin } = require('../../middlewares/role')


adminRouter.patch("/changeStatusUser/:id", requiredAdmin,checkRoleUser, checkRole, require("./changeStatusAccount"));
adminRouter.patch("/changeStatusAdmin/:id", requiredAdmin,checkRoleAdmin, checkRole, require("./changeStatusAccount"));
adminRouter.get("/listUsers", requiredAdmin,checkRoleUser, checkRole, require("./getListUser"));
adminRouter.get("/getUser/:id",requiredAdmin,checkRoleUser, checkRole,  require("./getAccountById"));
adminRouter.get("/getAdmin/:id",requiredAdmin,checkRoleAdmin, checkRole,  require("./getAccountById"));
adminRouter.get("/listAdmins",requiredAdmin,checkRoleAdmin, checkRole,require("./getListAdmin"));
adminRouter.patch("/changeRole/:id", requiredAdmin,checkRoleAdmin, checkRole, require("./changeRole"));

router.patch("/changePassword", requiredLogin, require("./changePassword"));

module.exports = { adminRouter, router };
