const Comment = require('../../models/comment/comment')

const getComment = async (req, res) => {
    const id = req.params.idNews;

    Comment.find({id_news: id}).sort({ createDay: -1 })
    .then(result => res.status(201).json(result))
};

module.exports = getComment;