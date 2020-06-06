const router = require("express").Router();
//const {requiredLogin} = require("../../middlewares/auth");

router.get("/",require("./getPermissions"));
router.get("/:id",require("./getPermissionById"));

module.exports={router};