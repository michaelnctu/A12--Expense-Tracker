// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')

const Record = require('./model/record')
const Category = require('./model/category')

// 引用路由器
const routes = require('./routes')

// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


const bodyParser = require('body-parser')

// 載入 method-override
const methodOverride = require('method-override')
require('./config/mongoose') //招喚config mongoose連線


app.use(bodyParser.urlencoded({ extended: true }))

//method override
app.use(methodOverride('_method'))

//setting static files
app.use(express.static('public'))

Handlebars.registerHelper('Emoji', function (category, currentCategory, options) {
  if (category === currentCategory) {
    return options.fn(this)
  }
  return options.inverse(this)
})

// edit選單中 可使選單停留在某一選項

Handlebars.registerHelper('selectedOption', function (value, currentValue) {
  if (value === currentValue) {
    return 'selected'
  } else {
    return ''
  }
})


// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})