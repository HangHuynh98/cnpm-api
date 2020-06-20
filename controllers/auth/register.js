const {
  insertAccount,
  getAccountByEmail,
} = require("../../services/accountService"); 
const { insertUserInfo } = require("../../services/userInforService");
const {
  BadRequest,
  InternalServerError 
} = require("../../utils/ResponseHelper"); 
const { getHashString, getRandomString } = require("../../utils/HashHelper");

const EXISTED_ACCOUNT = "This account existed";

const register = async (req, res) => {
 
  const bodyData = getAccountFromBodyRequest(req);
  if (!bodyData) return BadRequest(res, "invalid data");
  try {
    const account = await getAccountByEmail(bodyData.email);
    if (account) return BadRequest(res, EXISTED_ACCOUNT);
    const accountData = hashPasswordOfAccount(bodyData);
    const savingAccountResult = await insertAccount(accountData);
    const userInfoData = {
      name:bodyData.name,
      id_account: savingAccountResult._id,
      role: bodyData.role,
      isAdmin: bodyData.isAdmin,
    }; 
    const savingUserInfoResult = await insertUserInfo(userInfoData);
    const result = getResponseObject(savingAccountResult, savingUserInfoResult);
    res.status(201).json(result);
  } catch (error) {
    InternalServerError(res);
    console.log(error);  
  }
};

const getResponseObject = (account, userInfo) => {
  return {
    name:account.name,
    email:account.email,
    isAdmin:account.isAdmin,
    role:account.role,
    join_date: account.createdDay
  };
};

const hashPasswordOfAccount = (account) => {
  const saltPassword = getRandomString();
  const hashPassword = getHashString(account.password, saltPassword);
  const accountData = {
    email:account.email,
    name: account.name,
    isAdmin:account.isAdmin,
    role:account.role,
    hash_password: hashPassword,
    salt_password: saltPassword,
    status: true
  };
  return accountData;
};

const getAccountFromBodyRequest = req => {
  if (!req.body) return null;
  let { email, name, password, isAdmin, role } = req.body;
  if (email && password) {
    email=email.trim();
    name = name.trim();
    password = password.trim();
    if (email==""|| name==""||password == "") {
      return null;
    }
    return { email, name,password, isAdmin, role};
  } else {
    return null;
  }
};

module.exports = register;
