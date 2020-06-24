const Comment = require("../../models/comment/comment")
const jwt = require("jsonwebtoken");
const config = require("../../config");
const {
    isEmptyBody,
    hasAnyFieldEmpty
  } = require("../../utils/validatorRequest");
const {
    BadRequest,
    InternalServerError
  } = require("../../utils/ResponseHelper");
const { postComment } = require('../../services/commentService');

const post = async (req, res) => {
    try {
        if (isEmptyBody(req) || hasAnyFieldEmpty(req.body)) return BadRequest(res);
        let data= req.body
        let id_news=req.params.idNews
        data.id_news=id_news
        let token = req.headers["x-access-token"] || req.headers["authorization"];
        if (token && token.startsWith("JWT ")) {
            token = token.split(" ")[1];
        }
        if (token) {
            jwt.verify(token, config.SECRECT_WORD, async (err, decoded) => {
                if (err) {
                    return Unauthorized(res, "Invalid Token!");
                }
                data.id_account=decoded.id
                data.nameWriter=decoded.name
                
      });
    }
        const result = await postComment(data);
        res.status(201).send(result);
        
    } catch (error) {
        console.log(error);
        if(error.name == "ValidationError"){
            return BadRequest(res,error.message)
        }
        InternalServerError(res);
    }
  

};

module.exports = post;