const { deleteAccountById,getAccountById } = require("../../services/accountService");
const {
    InternalServerError,
    BadRequest,
    NotFound,Ok
  } = require("../../utils/ResponseHelper");

const del = async (req, res) => {
   
  const { id } = req.params;
  const {role}= await getAccountById(req.params.id);
  const idDecoded = req.decoded.id;
  let check=false
    if (!id) return BadRequest(res, "Invalid params");
  try {
      if(id === idDecoded){res.status(405).json({msg: 'Method not Allow'}) ;console.log(role);}
     
     else{
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
            console.log("aaaaaaaaa");
            
            const result = await deleteAccountById(id);
            if(!result) return NotFound(res, id+" is not found");
            Ok(res, "Deleted");
        }
        
    }} catch (error) {
      console.log(error)
      InternalServerError(res);
    }
}

module.exports = del;