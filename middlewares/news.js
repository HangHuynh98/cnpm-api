const { getNewsById } = require("../services/newsService");
const {
    InternalServerError,
    Unauthorized
  } = require("../utils/ResponseHelper");

const checkNewsStatus = async (req, res, next) => {
    try {
        console.log(req.params.idNews);
        const news = await getNewsById(req.params.idNews)
        console.log(news);
        
        if (news.status == false) return  Unauthorized(res, "The News does not exist!")
        next()
    } catch (e) {
      InternalServerError(res);
    }
  };

  module.exports = { checkNewsStatus };