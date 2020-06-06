const {changeNewsStatus} = require("../../services/newsService");
const {
    InternalServerError,
    BadRequest
} = require("../../utils/ResponseHelper");

const allowToDisplay = async(req,res)=>{    
    try{
        const {id} = req.params;
        const {status} = req.body;
        if(!id || (!status && status!=false)) return BadRequest(res);
        const result = await changeNewsStatus(id,status);
        if(!result) {
            res.status(500).send({error : "Change status fail."})
        }
        else res.status(200).send({error : null, message : "Status have changed."});
    }catch(e){
        console.log(e);
        InternalServerError(res);
    }
}

module.exports = allowToDisplay