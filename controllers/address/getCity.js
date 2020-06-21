const City = require('../../models/address/city')

const getCity = async (req, res) => {
    City.find()
    .then(result => res.status(201).json(result))
};

module.exports = getCity;