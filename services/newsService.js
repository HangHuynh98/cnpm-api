const News = require("../models/news");
const NEWS_STATUS = require("../utils/constant").NEWS_STATUS;


const getNewsByStatus = async (status, page = 1, pageSize = 5) => {
    let query;
    switch (status) {
      case NEWS_STATUS.AVAILABLE:
        query = News.find({ status: NEWS_STATUS.AVAILABLE });
        break;
      case NEWS_STATUS.UNAVAILABLE:
        query = News.find({ status: NEWS_STATUS.UNAVAILABLE });
        break;
      case NEWS_STATUS.HIDE:
        query = News.find({ status: NEWS_STATUS.HIDE });
        break;
      default:
        query = News.find();
    }
  
    return await getPageNews(query, page, pageSize);
  };


  const getNewsById = async id => {
    return await News.findById(id);
  };

  const insertNews = async newsData => {
    const news = new News(newsData);
    return await news.save();
  };


  const getPageNews = async (query, page, pageSize) => {
  
    page = page > 0 ? page : 1;
    const totalPage = await getTotalPage(pageSize, query);
    const data = await query
      .sort({ _id: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    return { page, pageSize, totalPage, data };
  };

  const getTotalPage = async (pageSize, query) => {
    const count = await News.countDocuments(query);
    return Math.ceil(count / pageSize);
  };

  const deleteNewsByIdNewsAndAccout = async (id, id_account) => {
    return await News.findOneAndDelete({ _id: id, id_account });
  };
  
  const changeNewsStatus = async (id, status) => {
    let result = await News.findByIdAndUpdate(id, { status });
    return result;
  };
  
  const getNewsByAccountId = async id_account => {
    return await News.find({ id_account });
  };


  module.exports = {
    
    getNewsByStatus,
    getNewsById,
    insertNews,
    deleteNewsByIdNewsAndAccout,
    changeNewsStatus,
    getNewsByAccountId

  };