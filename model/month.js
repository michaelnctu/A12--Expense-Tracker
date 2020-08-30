const monthRange = {}

const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

for (let i = 1; i <= 7; i++) {
  if ((i % 2) === 0) {    //小月
    if (i === 2) {
      monthRange[monthList[i - 1]] = { $gte: `2020-0${i}-01`, $lte: `2020-0${i}-28` }
    } else {
      monthRange[monthList[i - 1]] = { $gte: `2020-0${i}-01`, $lte: `2020-0${i}-30` }
    }
  } else {
    monthRange[monthList[i - 1]] = { $gte: `2020-0${i}-01`, $lte: `2020-0${i}-31` }
  }
}

for (let i = 8; i <= 12; i++) {
  if ((i % 2) === 0) {
    monthRange[monthList[i - 1]] = { $gte: `2020-0${i}-01`, $lte: `2020-0${i}-30` }
  } else {
    monthRange[monthList[i - 1]] = { $gte: `2020-0${i}-01`, $lte: `2020-0${i}-31` }
  }
}



module.exports = monthRange