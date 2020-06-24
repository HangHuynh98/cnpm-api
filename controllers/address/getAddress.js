const City = require('../../models/address/city')
const District = require('../../models/address/district')
const Ward = require('../../models/address/ward')

const getAddress = async (req, res) => {
    let address = []
    const { idCity, idDistrict, idWard }= req.params;
    await City.find({code: idCity}).then(result => address = [...address,{city: result[0].title}])
    await District.find({city: idCity,code: idDistrict}).then(result => address = [...address,{district: result[0].title}])
    await Ward.find({ city: idCity, district: idDistrict ,code: idWard}).then(result => address = [...address,{ward: result[0].title}])
    return res.status(201).json({address, str :`, ${address[2].ward}, ${address[1].district}, ${address[0].city}`});
};

module.exports = getAddress;