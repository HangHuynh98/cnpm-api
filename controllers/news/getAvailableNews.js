const { getAvailableNews } = require("../../services/newsService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");
const { NEWS_STATUS } = require("../../utils/constant");

const get = async (req, res) => {
  let { page, pageSize,city, district, ward, area, price } = req.query;
  let arrArea= area? area.split(","):null;
  let arrPrice= price? price.split(','):null;
  console.log(city,district,ward)
  console.log(arrArea)
  console.log(arrPrice)

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