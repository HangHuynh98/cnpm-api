const router = require("express").Router();
const adminRouter = require("express").Router();
const { requiredLogin ,requiredAdmin,checkRole } = require("../../middlewares/auth");
const {checkRoleNews } = require('../../middlewares/role')

router.get("/", require("./getAvailableNews"));
router.get("/getNewsById/:id", require("./getNewsById"));
router.get("/checkNewsStatus/:id", require("./checkNewsStatus"));
router.get("/getNewsByAccountId", requiredLogin, require("./getNewsByAccountId"));
router.get("/getNewsOfAccount/:id", require("./getNewsOfAccount"));
router.post("/postNews",requiredLogin, require("./postNews"));
router.delete("/:id",requiredLogin, require("./deleteNews"));
router.put("/:id",requiredLogin, require("./editNews"));

//admin
adminRouter.patch("/:id",requiredAdmin ,checkRoleNews,checkRole,require("./allowToDisplay")); 
adminRouter.delete("/:id",requiredAdmin ,checkRoleNews,checkRole, require("./deleteNewsByAdmin")); 
adminRouter.get("/",requiredAdmin ,checkRoleNews,checkRole, require("./getNewsByAdmin")); 

module.exports = {router,adminRouter};