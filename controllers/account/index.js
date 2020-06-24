const adminRouter = require("express").Router();
const router = require("express").Router();
const { requiredLogin ,requiredAdmin,checkRole,checkUser,checkAdmin } = require("../../middlewares/auth");
const {checkRoleUser,checkRoleAdmin } = require('../../middlewares/role')


adminRouter.patch("/changeStatusUser/:id", requiredAdmin,checkRoleUser, checkRole,checkUser, require("./changeStatusAccount"));
adminRouter.patch("/changeStatusAdmin/:id", requiredAdmin,checkRoleAdmin, checkRole, checkAdmin,require("./changeStatusAccount"));
adminRouter.get("/listUsers", requiredAdmin,checkRoleUser, checkRole, require("./getListUser"));
adminRouter.get("/listAdmins",requiredAdmin,checkRoleAdmin, checkRole,require("./getListAdmin"));
adminRouter.patch("/changeRole/:id", requiredAdmin,checkRoleAdmin, checkRole, require("./changeRole"));

router.patch("/changePassword", requiredLogin, require("./changePassword"));

module.exports = { adminRouter, router };
