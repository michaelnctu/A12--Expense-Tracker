// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Records = require('../../model/record') // 載入 restaurant model
const Categorys = require('../../model/category') //載入 category model


// index
router.get('/', (req, res) => {

  let totalAmount = 0

  return Records.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue })
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