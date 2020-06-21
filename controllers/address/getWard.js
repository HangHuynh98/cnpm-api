const Ward = require('../../models/address/ward')

const getWard = async (req, res) => {
    const { idCity, idDistrict}= req.params;
    console.log(idCity, idDistrict)
    Ward.find({city: idCity, district: idDistrict})
        .then(result => res.status(201).json(result))
};

module.exports = getWard;