const {updateUserInfoByIdAccount} = require("../../services/userInforService");
const {updateAccountByIdAccount} = require("../../services/accountService");
const {
    InternalServerError,
    NotFound
  } = require("../../utils/ResponseHelper");

const editUserInfo = async (req, res) => {
  const { id: idAccount } = req.params;
  let nAccInfo = {};
  let name={};
  for (let key in req.body) {
    if (req.body[key] || req.body[key] === 0) {  
        nAccInfo[key] = req.body[key];
        name[key] = req.body[key];
    }
  }
  try {
    console.log({name: name.name})
    const userInfo = await updateUserInfoByIdAccount(idAccount, nAccInfo);
    const account= await updateAccountByIdAccount(idAccount, name);
    if (!userInfo) return NotFound(res, idAccount + " is not found");
    res.send({userInfo: {
      ...userInfo._doc,
      name: account.name
    }});
  } catch (error) {
    console.log(error)
    if ((error.name === "CastError" || error.name === "SyntaxError")) return BadRequest(res, "Invalid data");
    InternalServerError(res);
  }
};

module.exports = editUserInfo;
