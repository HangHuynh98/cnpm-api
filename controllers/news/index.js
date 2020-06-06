const router = require("express").Router();
const { requiredLogin ,requiredAdmin } = require("../../middlewares/auth");

router.get("/", require("./getAvailableNews"));
router.get("/:id", require("./getNewsById"));
router.post("/postNews",requiredLogin, require("./postNews"));
router.delete("/:id",requiredLogin, require("./deleteNews"));

module.exports = {router};