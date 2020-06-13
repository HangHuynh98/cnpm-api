const { getNewsByStatus } = require("../../services/newsService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  let { page, pageSize ,status, search} = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 20;
  status = parseInt(status);
  console.log(page, pageSize, search)

  //if (page > totalPage) return BadRequest(res, "Wrong page number!");
  try {
    const result = await getNewsByStatus(status, page, pageSize, search);
    res.send(result);
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = get;
