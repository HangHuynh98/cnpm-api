
const checkRoleNews = (req, res, next) => {
    req.maRole= [2,5];
    next();
}
const checkRoleUser = (req, res, next) => {
     req.maRole= [3,5];
    next();
 }
 const checkRoleAdmin = (req, res, next) => {
     req.maRole= [4,5];
    next();  
}

module.exports = {checkRoleNews ,checkRoleUser,checkRoleAdmin};