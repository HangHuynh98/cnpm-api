const router = require("express").Router();
const adminRouter = require("express").Router();
const { requiredLogin ,requiredAdmin } = require("../../middlewares/auth");

router.get("/", require("./getAvailableNews"));
router.get("/getNewsById/:id", require("./getNewsById"));
router.get("/getNewsByAccountId", requiredLogin, require("./getNewsByAccountId"));
router.post("/postNews",requiredLogin, require("./postNews"));
router.delete("/:id",requiredLogin, require("./deleteNews"));
router.put("/:id",requiredLogin, require("./editNews"));

//admin
adminRouter.patch("/:id",requiredAdmin ,require("./allowToDisplay")); 
adminRouter.delete("/:id",requiredAdmin, require("./deleteNewsByAdmin")); 
adminRouter.get("/",requiredAdmin,require("./getNewsByAdmin")); 

module.exports = {router,adminRouter};