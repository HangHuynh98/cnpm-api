const { countNewsByMonth } = require("../../services/statisticService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const getByMonth = async (req, res) => {
    let {year}= req.body;

  try {
    const result = await countNewsByMonth(year);

    res.send(result);
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = getByMonth;