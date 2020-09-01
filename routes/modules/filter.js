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

// router.get("/:category", (req, res) => {

//   console.log('req params', req.params.category)

//   const category = req.params.category  //string type 從前端傳入

const categoryList = {
  living: '家居物業',
  transp: '交通出行',
  fun: '休閒娛樂',
  food: '餐飲食品',
  other: '其他'
}

//   const modelCategory = categoryList[category] //model中之類別為中文 用於之後的find


//   if (category === 'all') {
//     res.redirect('/')
//   } else {
//     return Records.find({ 'category': modelCategory }) // 以類別做篩選
//       .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//       .then(records => {
//         totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
//         Categorys.find()
//           .lean()
//           .then(categories => {
//             res.render('index', { records, totalAmount, categories, monthList })
//           })

//       })
//       .then()
//       .catch(error => console.log(error))

//   }

// })




router.post("/filter", (req, res) => {
  const userId = req.user._id
  const selectMonth = req.body.month
  const selectCategory = req.body.category
  const filter = []

  console.log('req.body', req.body)
  console.log('selectMonth是', selectMonth)
  console.log('selectCategory是', selectCategory)


  if (selectMonth && selectCategory) {
    filter.push({ date: monthRange[selectMonth], category: selectCategory })
  }
  if (selectMonth && !selectCategory) {
    filter.push({ date: monthRange[selectMonth] })
  }
  if (!selectMonth && selectCategory) {
    filter.push({ category: selectCategory })
  }

  filter[0]['userId'] = userId  //把userId納入 用於資料庫中 使id 與 filter關聯
  console.log('現在的filter', filter)

  console.log(filter[0].length)



  return Records.find(filter[0])
    .lean()
    .sort({ date: 'desc' })
    .then(records => {

      // console.log(records)
      totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)

      if (!filter[0].date && !filter[0].category) {  //唯一的filter為id時,就是沒有任何月份與category的filter
        return res.redirect('/')
      }
      res.render('index', { records, totalAmount, monthList, selectMonth, selectCategory })
    })
    .catch(error => console.log(error))
})




module.exports = router
