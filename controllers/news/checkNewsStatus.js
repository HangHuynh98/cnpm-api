const { checkNewsStatus } = require("../../services/newsService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const check = async (req, res) => {
  try {
    const result = await checkNewsStatus(req.params.id);
    res.send({status : result});
  } catch (error) {
    if ((error.name = "CastError")) return BadRequest(res, "Invalid id");
    InternalServerError(res);
  }
};

module.exports = check;