const { getUserInfoById } = require("../../services/userInforService");
const {
  InternalServerError,
  BadRequest,
  NotFound
} = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  const { id } = req.params;
  if(!id) return BadRequest(res);
  try {
    const result = await getUserInfoById(id);
    if(!result) return NotFound(res,"userId "+id+" is not found!");
    res.send(result);
  } catch (error) {
    if(error.name === "CastError") return BadRequest(res, "invalid id");
    InternalServerError(res);
  }
};

module.exports = get;
