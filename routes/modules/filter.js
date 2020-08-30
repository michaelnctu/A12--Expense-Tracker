const express = require('express')
const router = express.Router()
const monthRange = require('../../model/month')
const Records = require('../../model/record')
const Categorys = require('../../model/category')
const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

router.get("/:category", (req, res) => {

  console.log('req', req.params.category)

  const category = req.params.category  //string type 從前端傳入

  const categoryList = {
    living: '家居物業',
    transp: '交通出行',
    fun: '休閒娛樂',
    food: '餐飲食品',
    other: '其他'
  }

  const modelCategory = categoryList[category] //model中之類別為中文 用於之後的find

  console.log(modelCategory) //檢查類別

  if (category === 'all') {
    res.redirect('/')
  } else {
    return Records.find({ 'category': modelCategory }) // 以類別做篩選
      .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
      .then(records => {
        totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
        Categorys.find()
          .lean()
          .then(categories => {
            console.log(records)
            res.render('index', { records, totalAmount, categories, monthList })
          })
      })

      .catch(error => console.log(error))

  }

})




router.post("/month", (req, res) => {
  const selectMonth = req.body.month
  console.log('req', selectMonth)  //req.month


  return Records.find({ date: monthRange[selectMonth] })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      console.log(records)
      totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
      Categorys.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => {
          res.render('index', { records, totalAmount, categories, monthList, selectMonth })
        })
        .then()
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})




module.exports = router
