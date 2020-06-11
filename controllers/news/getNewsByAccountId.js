const { getNewsByAccountId } = require("../../services/newsService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");


const getAccountId = async (req, res) => {
  const { id: id_account } = req.decoded;
  console.log(id_account);
  try {
    const result = await getNewsByAccountId(id_account);
    res.send({data:result});
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = getAccountId;
