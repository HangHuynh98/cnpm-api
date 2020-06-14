const { getNewsByAdmin } = require("../../services/newsService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const get = async (req, res) => {

  try {
    const result = await getNewsByAdmin();
    res.send(result);
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = get;
