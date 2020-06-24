const News = require("../models/news");
const NEWS_STATUS = require("../utils/constant").NEWS_STATUS; 
const { getAccountById } = require("./accountService");
const {getUserInfoById} = require("./userInforService")

const getAvailableNews = async ( page, pageSize, city, district, ward, arrArea, arrPrice) => {
  const arrQuery = [{ status: NEWS_STATUS.AVAILABLE }]
  if (city) arrQuery.push({ address: { $regex: `${city}`, '$options': "i" } })
  if (district) arrQuery.push({ address: { $regex: `${district}`, '$options': "i" } })
  if (ward) arrQuery.push({ address: { $regex: `${ward}`, '$options': "i" } })
  if (arrArea) arrQuery.push({ area: { $gt: parseInt(arrArea[0]), $lt: parseInt(arrArea[1]) } })
  if (arrPrice) arrQuery.push({ price: { $gt: parseInt(arrPrice[0]), $lt: parseInt(arrPrice[1]) } })
  let query = {
    $and: arrQuery
  };
  const totalPage = Math.ceil((await News.find(query).count()) / pageSize);
  const data = await News.find(query).sort({ createDay: -1 })
  .limit(pageSize)
  .skip((page - 1) * pageSize)
  for (let i = 0; i < data.length; i++) {
    const account = await getAccountById(data[i].id_account)
    const userInfo = await getUserInfoById(data[i].id_account)
    data[i] = {
      ...data[i]._doc, user: {
        ...account._doc, ...userInfo._doc
      }
    }
  }
  return { page, pageSize, totalPage, data } 
};



const getNewsByAdmin = async () => {
  arr = await News.find().sort({ createDay: -1 })
  for (let i = 0; i < arr.length; i++) {
    const account = await getAccountById(arr[i]._doc.id_account)
    arr[i] = {
      ...arr[i]._doc, user: {
        id: account._id,
        email: account.email,
        isAdmin: account.isAdmin,
        name: account.name,
        status: account.status,
        role: account.role,
      }
    }
  }
  return arr;
};

const getNewsById = async id => {
  return await News.findById(id);
};

const insertNews = async newsData => {
  const news = new News(newsData);
  return await news.save();
};


const deleteNewsByIdNewsAndAccout = async (id, id_account) => {
  return await News.findOneAndDelete({ _id: id, id_account });
};

const deleteNewsById = async id => {
  return await News.findByIdAndDelete(id);
};

const changeNewsStatus = async (id, status) => {
  let result = await News.findByIdAndUpdate(id, { status });
  return result;
};

const getNewsByAccountId = async id_account => {
  return await News.find({ id_account }).sort({  createDay: -1 });
};

const getNewsOfAccount = async id_account => {
  return await News.find({ id_account,status:true }).sort({ createDay: -1 });
};


const editNews = async (id, id_account, news) => {
  return await News.findOneAndUpdate({ _id: id, id_account }, news, { new: true });
};









module.exports = {

  getAvailableNews,
  getNewsById,
  insertNews,
  deleteNewsByIdNewsAndAccout,
  changeNewsStatus,
  getNewsByAccountId,
  deleteNewsById,
  editNews,
  getNewsByAdmin,
  getNewsOfAccount

};