const { deleteNewsByIdNewsAndAccout } = require("../../services/newsService");
const {
    InternalServerError,
    BadRequest,
    NotFound,Ok
  } = require("../../utils/ResponseHelper");

const del = async (req, res) => {
  const { id } = req.params;
  const { id: idAccount } = req.decoded;
  try {
    const result = await deleteNewsByIdNewsAndAccout(id, idAccount);
    if(!result) return NotFound(res, id+" is not found");
    Ok(res, "Deleted");
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = del;
