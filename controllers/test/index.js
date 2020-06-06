const router = require("express").Router();
const { requiredLogin, requiredAdmin } = require("../../middlewares/auth");

router.get("/", require("./hello").sayHello);
router.get("/user", requiredLogin, require("./hello").user);
router.get("/admin", requiredAdmin, require("./hello").admin);
module.exports = router;
