// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Records = require('../../model/record') // 載入 restaurant model
const Categorys = require('../../model/category') //載入 category model


// index
router.get('/', (req, res) => {
  console.log("records印出來", Records)
  console.log("type是", typeof class Records { })

  return Records.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      console.log(records)
      totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
      Categorys.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => {
          res.render('index', { records, totalAmount, categories })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})



module.exports = router


