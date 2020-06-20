const _ = require('lodash');
const {getAccountAdmins} = require("../../services/accountService");
const {getUserInfoById}=require("../../services/userInforService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const get = async (req, res) => {


  try {
    let arr = await getAccountAdmins()
    for(let i = 0; i< arr.length; i++){
      let user = await getUserInfoById(arr[i]._id)
      arr[i] = {...arr[i]._doc, user}
      console.log(user)
    }
    res.send(arr);
   
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
