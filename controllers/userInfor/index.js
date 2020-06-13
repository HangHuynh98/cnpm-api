const router = require("express").Router({ mergeParams: true });
const {requiredLogin} = require("../../middlewares/auth");

router.put("/:id", requiredLogin, require("./updateInfo"));
router.get("/:id", requiredLogin, require("./getUserInfoById"));





module.exports = router;