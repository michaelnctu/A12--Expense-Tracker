
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Records = require('../../model/record') // 載入 restaurant model


// show add restaurant page
router.get('/new', (req, res) => {
  return res.render('new')  //進入create頁面
})

// create / update restaurant
router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body

  return Records.create(req.body)
    .then(() => res.redirect('/')) //回到根目錄
    .catch(error => console.log(error))

})




module.exports = router