const {getPermissionById} = require ("../../services/permissionService");
const{
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");
const  getPById = async(req, res) => {
    try{

      
        const result = await getPermissionById(req.params.id);
        res.send(result);
   
    }catch (error){
       if ((error.name = "CastError")) return BadRequest(res,"Invalid id");
       InternalServerError(res);
    }
}
 
 module.exports= getPById;
 