const { editNews } = require("../../services/newsService");
const {
    InternalServerError,
    BadRequest,
    NotFound
  } = require("../../utils/ResponseHelper");

const edit = async (req, res) => {
  const { id } = req.params;
  const { id: idAccount } = req.decoded;
  let nNews = {};
  for (let key in req.body) {
    if (req.body[key] || req.body[key] === 0) {
      nNews[key] = req.body[key];
    }
  }
  try {
    const result = await editNews(id, idAccount, nNews);
    if(!result) return NotFound(res,id+" is not found");
    res.send(result);
  } catch (error) {
    InternalServerError(res);
  }
};

module.exports = edit;
