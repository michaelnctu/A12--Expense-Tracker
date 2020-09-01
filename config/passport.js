
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../model/users')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {       //要求email去做辨別
      User.findOne({ email })
        .then(user => {

          if (!user) {  //user不存在
            return done(null, false, req.flash('err_msg', 'That email is not registered!'))
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('err_msg', 'email與密碼不符合'))
            }
            return done(null, user)
          })
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


