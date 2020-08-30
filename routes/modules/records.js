
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Records = require('../../model/record') // 載入 restaurant model ..代表目前位置之父層


// show add restaurant page
router.get('/create', (req, res) => {
  return res.render('new')  //進入create頁面
})


// create / update restaurant  
router.post('/', (req, res) => {
  const { name, category, date, amount, merchant } = req.body
  const userId = req.user._id

  return Records.create({ name, category, date, amount, userId, merchant })
    .then(() => res.redirect('/')) //回到根目錄
    .catch(error => console.log(error))

})



//進入到edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Records.findOne({ _id, userId })
    .lean()
    .then(record => {
      // console.log('----', record)
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})


// edit expense
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, category, date, amount, merchant } = req.body

  return Records.findOne({ _id, userId })
    .then(record => {
      record.merchant = merchant
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



//delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Records.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router
