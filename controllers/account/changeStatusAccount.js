const { ManageAccountById } = require("../../services/accountService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const block = async (req, res) => {
  const {status } = req.body;
  const { id: id } = req.params;
  const idDecoded = req.decoded.id; 
  if (!id) return BadRequest(res, "Invalid params"); 
  try {
    if(id === idDecoded){res.status(405).json({msg: 'Method not Allow'})
  }
    else{
      const account = await ManageAccountById(id, status);
      if(!account) return NotFound(res, id + " is not found");
      let result = {
        status: account.status,
        isAdmin: account.isAdmin,
        role: [
          ...account.role
        ],
        _id: account._id,
        email: account.email,
        name: account.name,
        createdDay:account.createdDay,
      }
      res.send(result);
    }
   
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = block;
