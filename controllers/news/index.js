const router = require("express").Router();
const adminRouter = require("express").Router();
const { requiredLogin ,requiredAdmin } = require("../../middlewares/auth");

router.get("/", require("./getAvailableNews"));
router.get("/getNewsById/:id", require("./getNewsById"));
router.get("/getNewsByAccountId", requiredLogin, require("./getNewsByAccountId"));
router.post("/postNews",requiredLogin, require("./postNews"));
router.delete("/:id",requiredLogin, require("./deleteNews"));

//admin
adminRouter.patch("/:id", require("./allowToDisplay")); // chua co requiredAdmin

module.exports = {router,adminRouter};