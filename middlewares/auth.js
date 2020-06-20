const jwt = require("jsonwebtoken");
const config = require("../config");
const {
  Forbidden,
  InternalServerError,
  Unauthorized
} = require("../utils/ResponseHelper");
const { getUserRoleById } = require("../services/accountService");
const LockedUser = "you are blocked, please contact admin for more detail!";
const { getAccountById } = require("../services/accountService");

const requiredLogin = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("JWT ")) {
      token = token.split(" ")[1];
    }
    if (token) {
      jwt.verify(token, config.SECRECT_WORD, async (err, decoded) => {
        if (err) {
          return Unauthorized(res, "Invalid Token!");
        }
        req.decoded = decoded;
        const {status} = await getAccountById(decoded.id);
        if (!status) return Unauthorized(res, LockedUser);
        next();
      });
    } else Forbidden(res, "Not found Token !");
  } catch (e) {
    console.log("REQUIRED LOGIN ERROR", e);
    InternalServerError(res);
  }
};

const requiredAdmin = async (req, res, next) => {
  console.log('requiredAdmin')
  requiredLogin(req, res, async () => {
    try {
      const { isAdmin } = await getUserRoleById(req.decoded.id);
      //console.log(isAdmin);
      if (isAdmin===true) {
        next();
      } else {
        return Forbidden(res, "This action requires admin role!");
      }
    } catch (e) {
      console.log("REQUIRED ADMIN ERROR", e);  
      InternalServerError(res);
    }
  });
};
const checkRole = async (req, res, next ) => {
  const {maRole} = req;
  const {role} = req.decoded;
  let status;
  // role.map(item =>{
  //   maRole.map( iRole =>{
  //     item === iRole? status =true: status= false});
  // })
  // if(status) next();
  // else return res.status(405).json({msg: 'Method not Allow'})
  role.map(item =>{
    maRole.map( iRole =>{
      item === iRole? status =true: status= false
      if(status) next();
    });
  })
  // if(!status) return res.status(405).json({msg: 'Method not Allow'})
 
};
module.exports = { requiredLogin, requiredAdmin, checkRole };
