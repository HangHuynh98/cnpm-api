const Permission = require("../models/permission");

const getPermissions = async () => {
    return await Permission.find();
  };

  const getPermissionById = async id => {
    return await Permission.findOne({code:id});
  };
module.exports ={
    getPermissionById,
    getPermissions
};
