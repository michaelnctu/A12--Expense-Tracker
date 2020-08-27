
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../model/users')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    { usernameField: 'email' }, (email, password, done) => {       //要求email去做辨別
      User.findOne({ email })
        .then(user => {

          if (!user) {  //user不存在
            return done(null, false, { message: 'That email is not registered!' })
          }
          if (user.password !== password) {
            return done(null, false, { message: 'Email or Password incorrect.' })
          }
          return done(null, user) //表示沒有錯誤並附上使用者資訊
        })
        .catch(err => done(err, false))
    }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })


}


