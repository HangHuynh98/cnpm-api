const router = require("express").Router();
const {requiredLogin} = require("../../middlewares/auth");
const {multerUploads} = require("../../middlewares/multer");

router.post("/", [multerUploads, requiredLogin, ], require("./uploadPhoto"));

module.exports = router;