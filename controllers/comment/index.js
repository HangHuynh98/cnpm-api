const router = require("express").Router();

router.post("/:idNews", require("./postComment"));
router.get("/:idNews", require("./getCommentByIdNews"));

module.exports = {router};