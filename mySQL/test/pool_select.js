//pool.js 의 내용을 불러오기 위한것7
const pool = require("./pool")

sql = "SELECT * FROM customers"
pool.query(sql, function (err, results, fields) {
  if (err) { console.log(err) }
  console.log(results)
})