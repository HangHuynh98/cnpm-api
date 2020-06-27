const {changeRoleByIdAccount,getAccountById} = require("../../services/accountService");
const {
    InternalServerError,
    NotFound
  } = require("../../utils/ResponseHelper"); 

const changed = async (req, res) => {
  console.log()
  const { id: idAccount } = req.params; 
  const idDecoded = req.decoded.id; 
  const {role}= await getAccountById(req.params.id);
  let check=false
  let nAccInfo = {};
  for (let key in req.body) {
    if (req.body[key] || req.body[key] === 0) {
        nAccInfo[key] = req.body[key];
    }
  }
  try {
   if(idAccount === idDecoded) {res.status(405).json({msg: 'Method not Allow'})} 
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
      const account = await changeRoleByIdAccount(idAccount, nAccInfo);
      if (!account) return NotFound(res, idAccount + " is not found");
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
      res.send(result);}}
  } catch (error) {
    console.log(error)
    if ((error.name === "CastError" || error.name === "SyntaxError")) return BadRequest(res, "Invalid data");
    InternalServerError(res);
  }
};

module.exports = changed;
