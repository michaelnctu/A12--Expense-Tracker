// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Records = require('../../model/record') // 載入 restaurant model
const Categorys = require('../../model/category') //載入 category model

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


// index
router.get('/', (req, res) => {
  const userId = req.user._id

  return Records.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      console.log(records)
      totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
      Categorys.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => {
          console.log('顯示', monthList)
          res.render('index', { records, totalAmount, categories, monthList })
        })
        .catch(error => console.log(error))
    })

    .catch(error => console.log(error))
})



module.exports = router


