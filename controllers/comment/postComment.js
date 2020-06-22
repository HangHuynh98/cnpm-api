const Comment = require("../../models/comment/comment")
const {
    isEmptyBody,
    hasAnyFieldEmpty
  } = require("../../utils/validatorRequest");
  const {
    BadRequest,
    InternalServerError
  } = require("../../utils/ResponseHelper");

const postComment = async (req, res) => {
    try {
        if (isEmptyBody(req) || hasAnyFieldEmpty(req.body)) return BadRequest(res);
        let data= req.body
        let id_news=req.params.idNews
        data.id_news=id_news
     
        const comments = new Comment(data);
        result = await comments.save();
        res.status(201).send(result);
        
    } catch (error) {
        console.log(error);
        if(error.name == "ValidationError"){
            return BadRequest(res,error.message)
        }
        InternalServerError(res);
    }
  

};

module.exports = postComment;