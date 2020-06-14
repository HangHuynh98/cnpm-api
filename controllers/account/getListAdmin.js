const {getAccountAdmins} = require("../../services/accountService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  let { status } = req.query;
  try {
    const result = await getAccountAdmins(true);
    res.send(result);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
