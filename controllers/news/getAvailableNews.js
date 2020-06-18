const { getAvailableNews } = require("../../services/newsService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");
const { NEWS_STATUS } = require("../../utils/constant");

const get = async (req, res) => {
  let { page, pageSize, search } = req.query;
  let { city, district, ward, area, price } = req.body;
  let arrArea= area? area.split(","):null;
  let arrPrice= price? price.split(','):null;

  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 5;
  try {
    const result = await getAvailableNews( page, pageSize,city,district,ward,arrArea,arrPrice);
    res.send(result);
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = get;