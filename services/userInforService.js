const UserInfo = require("../models/userInfo");

const insertUserInfo = async userInfoData => {
  const userInfo = new UserInfo(userInfoData);
  return await userInfo.save();
};

const getUserInfoByID = async id => {
  return await UserInfo.findOne({ id_account: id });
};
const getUserInfoByUserName = async username => {
  return await UserInfo.findOne({ username });
};

const updateAvatar = async (id, avatar) => {
  return await UserInfo.findOneAndUpdate({ id_account: id }, { avatar });
};

const getUserInfoById = async id => {
  return await UserInfo.findOne({ id_account: id });
};

const updateUserInfoByIdAccount = async (id, userInfoData) => {
  return await UserInfo.findOneAndUpdate({ id_account: id }, userInfoData, {
    new: true
  });
};


module.exports = {
  insertUserInfo,
  getUserInfoById,
  getUserInfoByUserName,
  updateUserInfoByIdAccount,
  getUserInfoByID,
  updateAvatar
};
