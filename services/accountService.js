const Account = require("../models/account");
const { ACCOUNT_STATUS } = require("../utils/constant"); 

const insertAccount = async account => {
  const acc = new Account(account);
  const result = await acc.save();
  return result;
};

const getAccountByEmail= async email => {
  return await Account.findOne({ email });
};
const getAccountByUserName = async name => {
  return await Account.findOne({ name });
};

const getAccountById = async id => {
  return await Account.findById(id,{"status":1,"isAdmin":1,"role":1,"email":1, "name":1, "createdDay":1});
};

const getUserRoleById = async id => {
  return await Account.findById(id).select('isAdmin');
};

const changePassword = async (id, newPass) => {
  return await Account.findByIdAndUpdate(id, { hash_password: newPass });
};

const ManageAccountById = async (id, status) => {
  return await Account.findByIdAndUpdate(id, { status }, { new: true });
};


const getAccountUsers = async () => {
    arr=await Account.find({isAdmin:false},{"status":1,"isAdmin":1,"role":1,"email":1, "name":1, "createdDay":1}) ;
    return arr
};
const getAccountAdmins = async () => {
  arr=await Account.find({isAdmin:true},{"status":1,"isAdmin":1,"role":1,"email":1, "name":1, "createdDay":1}) ;
    return arr
};

const changeRoleByIdAccount = async (id, role) => {
  return await Account.findOneAndUpdate({ _id: id }, role, {
    new: true
  });
};
const updateAccountByIdAccount = async (id, name) => {
  return await Account.findOneAndUpdate({ _id: id }, name, {
    new: true
  });
};
// const blockAccountById = async (id, AccountData) => {
//   return await Account.findOneAndUpdate({ _id: id }, AccountData, {
//     new: true
//   });
// };



module.exports = {
  insertAccount,
  getAccountByEmail,
  getAccountByUserName,
  getUserRoleById,
  ManageAccountById,
  getAccountById,
  getAccountUsers,
  getAccountAdmins,
  changePassword,
  changeRoleByIdAccount,
  updateAccountByIdAccount
};
