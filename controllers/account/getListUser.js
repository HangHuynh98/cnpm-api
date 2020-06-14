const _ = require('lodash');
const {getAccountUsers} = require("../../services/accountService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  let { status } = req.query;
  const omit = (prop, { [prop]: _, ...rest }) => rest;

  try {
    const result = await getAccountUsers();
    res.send(result)
   
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
