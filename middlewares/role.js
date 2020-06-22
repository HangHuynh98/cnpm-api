
const checkRoleNews = (req, res, next) => {
    req.maRole= [2,4];
    next();
}
const checkRoleUser = (req, res, next) => {
     req.maRole= [3,4];
    next();
 }
 const checkRoleAdmin = (req, res, next) => {
     req.maRole= [4];
    next();  
}

module.exports = {checkRoleNews ,checkRoleUser,checkRoleAdmin};