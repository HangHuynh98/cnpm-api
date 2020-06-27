const { ManageAccountById,getAccountById } = require("../../services/accountService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const block = async (req, res) => {
  const {status } = req.body;
  const { id: id } = req.params;
  const idDecoded = req.decoded.id;
  const {role,isAdmin}= await getAccountById(req.params.id);
  let check= false;
  if (!id) return BadRequest(res, "Invalid params"); 
  try {
    if(id === idDecoded){res.status(405).json({msg: 'Method not Allow'})
  }
    else{
      if(isAdmin==true){
        role.map(irole =>{
          console.log("bbbbbbbb");
          console.log(irole)
          if (irole==4){res.status(405).json({msg: 'Method not Allow'})
          console.log(irole);}
          else{
              check=true;
          }
      })
      console.log(check);
      if(check==true){
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
    }else{
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
    }
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = block;
