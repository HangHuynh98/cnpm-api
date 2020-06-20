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
    const account = await changeRoleByIdAccount(idAccount, nAccInfo);
    console.log(account);
    if (!account) return NotFound(res, idAccount + " is not found");
    let result = {
      status: account.status,
      isAdmin: account.isAdmin,
      role: [
        ...account.role
      ],
      _id: account._id,
      email: account.email,
      name: account.name,
      createdDay:account.createdDay,
    }
    res.send(result);
  } catch (error) {
    console.log(error)
    if ((error.name === "CastError" || error.name === "SyntaxError")) return BadRequest(res, "Invalid data");
    InternalServerError(res);
  }
};

module.exports = changed;
