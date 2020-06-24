const jwt = require("jsonwebtoken");
const config = require("../../config");
const DefNoRememberTime = config.DEF_EXP_SHORT;
const DefRememberTime = config.DEF_EXP_LONG;
const {updateUserInfoByIdAccount} = require("../../services/userInforService");
const {updateAccountByIdAccount} = require("../../services/accountService");
const {
    InternalServerError,
    NotFound
  } = require("../../utils/ResponseHelper");

const editUserInfo = async (req, res) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("JWT ")) {
      token = token.split(" ")[1];
    }
    if (token) {
      jwt.verify(token, config.SECRECT_WORD, async (err, decoded) => {
        if (err) {
          return Unauthorized(res, "Invalid Token!");
        }
        const {id} = req.decoded;
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
          const userInfo = await updateUserInfoByIdAccount(id, nAccInfo);
          const account= await updateAccountByIdAccount(id, name);
          if (!userInfo) return NotFound(res, id + " is not found");
          const createToken = (account, expireTime=DefNoRememberTime) => {
            return jwt.sign(
              { name: account.name, id: account._id, email: account.email, isAdmin:account.isAdmin, role: account.role },
              config.SECRECT_WORD,
              {
                expiresIn: expireTime
              }
            );
          };    
          res.send({userInfo: {
            token: createToken(account,expireTime =DefNoRememberTime),
            ...userInfo._doc,
            name: account.name
          }});
        } catch (error) {
          console.log(error)
          if ((error.name === "CastError" || error.name === "SyntaxError")) return BadRequest(res, "Invalid data");
          InternalServerError(res);
        }
    })
  } else Forbidden(res, "Not found Token !");
  
};

module.exports = editUserInfo;
