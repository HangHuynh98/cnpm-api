const { deleteAccountById } = require("../../services/accountService");
const {
    InternalServerError,
    BadRequest,
    NotFound,Ok
  } = require("../../utils/ResponseHelper");

const del = async (req, res) => {
   
  const { id } = req.params;
  const idDecoded = req.decoded.id; 
  if (!id) return BadRequest(res, "Invalid params");
  try {
    if(id === idDecoded){res.status(405).json({msg: 'Method not Allow'})
}
  else{
    const result = await deleteAccountById(id);
    if(!result) return NotFound(res, id+" is not found");
    Ok(res, "Deleted");}
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = del;