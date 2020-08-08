
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Records = require('../../model/record') // 載入 restaurant model


// show add restaurant page
router.get('/create', (req, res) => {
  return res.render('new')  //進入create頁面
})


// create / update restaurant
router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body

  return Records.create(req.body)
    .then(() => res.redirect('/')) //回到根目錄
    .catch(error => console.log(error))

})

//edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Records.findById(id)
    .lean()
    .then((record => res.render('edit', { record })))
    .catch(error => console.log(error))
})

// edit expense
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount } = req.body

  return Records.findById(id)
    .then(record => {
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
  const id = req.params.id
  return Records.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})




module.exports = router