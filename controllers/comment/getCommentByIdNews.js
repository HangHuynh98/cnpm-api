const {
    InternalServerError,
    BadRequest

  } = require("../../utils/ResponseHelper");
const { getNewsById } = require('../../services/newsService');

const { getComment } = require('../../services/commentService');

const get = async (req, res) => {
    try {
    const id = req.params.idNews;
    const check = await getNewsById(id)
    const result = await getComment(id);
    res.send(result); 

} catch (error) {
    if ((error.name = "CastError")) return BadRequest(res, "The News does not exist");
    InternalServerError(res);
  }
};

module.exports = get;