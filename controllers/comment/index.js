const router = require("express").Router();
const adminRouter = require("express").Router();
const { requiredAdmin,checkRole } = require("../../middlewares/auth");
const {checkRoleNews } = require('../../middlewares/role')
const {checkNewsStatus } = require('../../middlewares/news')


router.post("/:idNews",checkNewsStatus, require("./postComment"));
router.get("/:idNews", require("./getCommentByIdNews"));
adminRouter.delete("/:id",requiredAdmin ,checkRoleNews,checkRole, require("./delComment"));

module.exports = {router,adminRouter};