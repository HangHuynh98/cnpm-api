const adminRouter = require("express").Router();
const router = require("express").Router();
const { requiredAdmin, requiredLogin } = require("../../middlewares/auth");

adminRouter.put("/", requiredAdmin, require("./blockAccount"));
adminRouter.get("/", requiredAdmin, require("./getListUser"));
adminRouter.get("/listadmin",requiredAdmin,require("./getListAdmin"));
adminRouter.patch("/", requiredAdmin, require("./changePasswordForAdmin"));
adminRouter.patch("/:id", requiredAdmin, require("./changeRole"));

router.patch("/", requiredLogin, require("./changePassword"));

module.exports = { adminRouter, router };
