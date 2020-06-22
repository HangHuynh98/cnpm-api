const router = require("express").Router();


router.get("/cities", require("./getCity"));
router.get("/city/:id", require("./getDistrict"));
router.get("/city/:idCity/district/:idDistrict", require("./getWard"));
router.get("/:idCity/:idDistrict/:idWard", require("./getAddress"));





module.exports = {router};