const Record = require('../record')
const bcrypt = require('bcryptjs')
const User = require('../users')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'Jason',
  email: 'jason@gmail.com',
  password: '12345678'
}


db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))


    .then(user => {
      const userId = user._id
      return Promise.all(
        Record.create(
          {
            name: "午餐",
            category: "餐飲食品",
            date: "2020-08-03",
            amount: "80",
            userId: userId
          },
          {
            name: "健身",
            category: "休閒娛樂",
            date: "2020-08-03",
            amount: "50",
            userId: userId
          },
          {
            name: "房租",
            category: "家居物業",
            date: "2020-08-03",
            amount: "120000",
            userId: userId
          },
          {
            name: "搭公車",
            category: "交通出行",
            date: "2020-08-03",
            amount: "36",
            userId: userId
          }
        )
      )
    })

    .then(() => {
      console.log('done.')
      process.exit()
    })
})