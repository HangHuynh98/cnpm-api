const District = require('../../models/address/district')

const getDistrict = async (req, res) => {
    const id = req.params.id;

    District.find({city: id})
    .then(result => res.status(201).json(result))
};

module.exports = getDistrict;