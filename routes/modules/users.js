const express = require('express')
const router = express.Router()

const User = require('../../model/users')

router.get('/login', (req, res) => {
  res.render('login')

})

router.get('/register', (req, res) => {

  res.render('register')

})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body //object

  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('user already exists!!')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({    //此處return傳遞給下一個 then
          name, email, password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }

    })
})


module.exports = router
