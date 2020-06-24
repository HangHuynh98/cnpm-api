const { getNewsOfAccount } = require("../../services/newsService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");


const getOfAccount = async (req, res) => {
  const { id: id_account } = req.params;
  try {
    const result = await getNewsOfAccount(id_account);
    res.send({data:result});
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = getOfAccount;
