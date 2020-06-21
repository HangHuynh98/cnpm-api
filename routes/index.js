const app = require("express")();
const {} = require("../controllers/news");


app.use("/userinfo", require("../controllers/userInfor"));
app.use("/address", require("../controllers/address").router);
app.use("/admin/accounts", require("../controllers/account").adminRouter);
app.use("/accounts", require("../controllers/account").router);
app.use("/", require("../controllers/auth"));
app.use("/news", require("../controllers/news").router);
app.use("/permissions", require("../controllers/permission").router);
app.use("/admin/news", require("../controllers/news").adminRouter);
app.use("/admin/statistic", require("../controllers/statistic").adminRouter);

module.exports = app;
