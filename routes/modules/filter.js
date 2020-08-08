const express = require('express')
const router = express.Router()
const Records = require('../../model/record')
const Categorys = require('../../model/category')

//filter
//家居物業
router.get("/living", (req, res) => {
  console.log(req.query)
});


// //交通出行
// router.get("/transp", (req, res) => {
//   Restaurant.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({ name: "desc" })
//     .then((restaurants) => res.render("index", { restaurants })) // 將資料傳給 index 樣板
//     .catch((error) => console.error(error)); // 錯誤處理
// });

// //休閒娛樂
// router.get("/food", (req, res) => {
//   Restaurant.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({ category: "asc" })
//     .then((restaurants) => res.render("index", { restaurants })) // 將資料傳給 index 樣板
//     .catch((error) => console.error(error)); // 錯誤處理
// });

// //餐飲食品
// router.get("/other", (req, res) => {
//   Restaurant.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({ location: "asc" })
//     .then((restaurants) => res.render("index", { restaurants })) // 將資料傳給 index 樣板
//     .catch((error) => console.error(error)); // 錯誤處理
// });

// //其他

// router.get("/other", (req, res) => {
//   Restaurant.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({ location: "asc" })
//     .then((restaurants) => res.render("index", { restaurants })) // 將資料傳給 index 樣板
//     .catch((error) => console.error(error)); // 錯誤處理
// });

module.exports = router


