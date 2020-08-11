const express = require('express')
const router = express.Router()

const Records = require('../../model/record')
const Categorys = require('../../model/category')

//filter

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

  const modelCategory = categoryList[category] //model 中之類別 用於之後的find


  let totalAmount = 0

  console.log(modelCategory)
  if (category === 'all') {
    res.redirect('/')
  } else {
    return Records.find({ category: modelCategory }) // 以類別做篩選
      .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
      // .then(records => {
      //   totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
      //   Categorys.find()
      //     .lean()
      //     .then(categories => {
      //       console.log(records)
      //       res.render('index', { records, totalAmount, categories })
      //     })
      // })
      .then(records => console.log(records))

      .catch(error => console.log(error))

  }

})


module.exports = router
