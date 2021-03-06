const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../model/users')

router.get('/login', (req, res) => {
  res.render('login')

})


// 加入 middleware，驗證 reqest 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {

  res.render('register')

})


router.get('/logout', (req, res) => {
  req.logout()   //是 Passport.js 提供的函式
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})


router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body //object
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有的欄位都是必填的!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符!' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '此email已經被註冊過了!!' })
        return res.render('register', {       //因為後面沒有then return直接跳回
          errors, name, email, password, confirmPassword  //將資料留在register頁面上
        })
      }

      return bcrypt
        .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
        .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
        .then(hash => User.create({
          name,
          email,
          password: hash // 用雜湊值取代原本的使用者密碼
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})


module.exports = router
