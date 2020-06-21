const News = require("../models/news");
const Account = require("../models/account");
const { lastIndexOf } = require("lodash");



const getTotal = async ()=>{
    totalNews=  await News.countDocuments();
    totalAdmin=  await Account.countDocuments({isAdmin:true});
    totalUser=  await Account.countDocuments({isAdmin:false});

    return { totalNews, totalAdmin,totalUser }
  }

  const countNewsByMonth = async ()=>{
    let arrData= await getYear()
    console.log(arrData.length)
    for(let j=0;j<arrData.length;j++) {
      let arr=[]
      for (let i = 1; i < 13; i ++) {
        let dateG,dateL
        dateG=setTimes(1,i,arrData[j].year)
        dateL=setTimes(1,i+1,arrData[j].year)
        let query =  {
            createDay: {
                $gte: dateG,
                $lt: dateL
            }
        }
        const totalNewsByMonth = Math.ceil(await News.find(query).count());
        arr.push(totalNewsByMonth)
    }
    arrData[j].data = arr;
  }

  return arrData
}

  const getYear= async ()=> {
    news = await News.find()
    arr = []
    for (let i = 0; i < news.length; i++) 
    {
      const a = news[i].createDay
      const b = a.getFullYear()
      let check = true;
      for(let i = 0 ; i< arr.length ; i ++) {
        if(arr[i].year == b) check = false;
      }
      if(check) arr= [...arr, {year: b, data: []}]
    }
    return arr;
  }

  const setTimes= (day,month,year) =>{
    let date = new Date()
    date.setDate(day)
    date.setMonth(month-1)
    date.setFullYear(year)
    date.setHours(7)
    date.setMinutes(0)
    date.setSeconds(0)

    return date;
  }
  
  module.exports = {

    getTotal,
    countNewsByMonth
  
  };