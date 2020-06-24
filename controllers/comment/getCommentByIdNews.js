const Comment = require('../../models/comment/comment')
const {
    InternalServerError,
    BadRequest

  } = require("../../utils/ResponseHelper");
const { getNewsById } = require('../../services/newsService');

const get = async (req, res) => {
    try {

    const id = req.params.idNews;
    const check = await getNewsById(id)
    Comment.find({id_news: id}).sort({ createDay: -1 })
    .then(result => res.status(200).json(result))

} catch (error) {
    if ((error.name = "CastError")) return BadRequest(res, "The News does not exist");
    InternalServerError(res);
  }
};

module.exports = get;