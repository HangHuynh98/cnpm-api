const {changeRoleByIdAccount} = require("../../services/accountService");
const {
    InternalServerError,
    NotFound
  } = require("../../utils/ResponseHelper");

const changed = async (req, res) => {
  const { id: idAccount } = req.params;
  let nAccInfo = {};
  for (let key in req.body) {
    if (req.body[key] || req.body[key] === 0) {
        nAccInfo[key] = req.body[key];
    }
  }
  try {
    const result = await changeRoleByIdAccount(idAccount, nAccInfo);
    if (!result) return NotFound(res, idAccount + " is not found");
    res.send(result);
  } catch (error) {
    console.log(error)
    if ((error.name === "CastError" || error.name === "SyntaxError")) return BadRequest(res, "Invalid data");
    InternalServerError(res);
  }
};

module.exports = changed;
