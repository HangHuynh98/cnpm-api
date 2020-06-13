const router = require("express").Router();
const {requiredAdmin} = require("../../middlewares/auth");

router.get("/",requiredAdmin,require("./getPermissions"));
router.get("/:id",requiredAdmin,require("./getPermissionById"));

module.exports={router};