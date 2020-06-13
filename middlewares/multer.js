const multer = require("multer");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).array("");
const DataUri = require('datauri')
const path = require('path');
const dUri = new DataUri();
const dataUri = file => {
    console.log("FILE NAME",file.originalname,path.extname(file.originalname))
    return dUri.format(path.extname(file.originalname).toString(), file.buffer);
}

module.exports = { multerUploads , dataUri};

