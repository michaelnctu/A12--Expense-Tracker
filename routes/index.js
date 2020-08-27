
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入  模組程式碼
const records = require('./modules/records')

// 引入 home 模組程式碼
const home = require('./modules/home')

// 引入 sort 模組程式碼
const filter = require('./modules/filter')

const users = require('./modules/users')

// 將網址結構符合 導向 home 模組 
router.use('/', home)

router.use('/records', records)

router.use('/', filter)

router.use('/users', users)

// 匯出路由器
module.exports = router