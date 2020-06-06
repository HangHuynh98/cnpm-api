const {BadRequest, InternalServerError} = require("../../utils/ResponseHelper");
const {dataUri} = require("../../middlewares/multer");
const {uploadPhoto} = require("../../utils/UploadPhotoHelper");

const upload = async (req, res) => {
  try {
    if (!req.files) {
      return BadRequest(res, "Has no file!");
    }
    const files = getFiles(req);
    const urls = [];
    for(let i in files){
      const uploadResult = await uploadPhoto(files[i]);
      urls.push(uploadResult.url);
    }
    res.send({urls})
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};

const getFiles = (req)=>{
  return req.files.map(file=>dataUri(file).content);
}

module.exports = upload;
