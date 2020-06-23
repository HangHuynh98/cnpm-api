const router = require("express").Router({ mergeParams: true });
const {requiredLogin} = require("../../middlewares/auth");

router.put("/", requiredLogin, require("./updateInfo"));
router.get("/:id", requiredLogin, require("./getUserInfoById"));





module.exports = router;