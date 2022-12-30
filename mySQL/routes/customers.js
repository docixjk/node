var express = require("express");
const pool = require("../test/pool")
var router = express.Router();

//전체 조회
router.get('/', (req, res) => {
  let sql = "SELECT * FROM customers"
  pool.query(sql, function (err, results, fields) {
    if (err) { console.log(err) }
    res.json(results)//json 방식으로 자동으로 바뀜
  })
})
//단건 조회
//:id 넣어줌
router.get('/:id', (req, res) => {
  const id = req.params.id
  let sql = "SELECT * FROM customers WHERE id=?"
  pool.query(sql, id, function (err, results, fields) {
    if (err) { console.log(err) }
    res.json(results[0])//들어온 정보가 배열이라 그걸 꺼내기위해 배열로 뽑음
  })
})
//등록
router.post('/', (req, res) => {
  let sql = "INSERT INTO customers SET ?"
  pool.query(sql, req.body, function (err, results, fields) {
    if (err) { console.log(err) } //error시 콘솔출력
    res.json(results)
  });
})
//수정
router.put('/:id', (req, res) => {
  let sql = "UPDATE customers SET ? WHERE id= ?"
  let data = [req.body, req.params.id]// ? 받는개 2개니 배열로 받음
  pool.query(sql, data, function (err, results, fields) {//data를 요청해야함
    let resultData = {}
    if (err) {
      console.log(err) //error시 콘솔출력
    }
    if (results.changedRows > 0) { //changedRows : 실제로 update된 rows 수
      resultData.result = true
      resultData.data = req.body
    } else {
      resultData.result = false
    }
    res.send(resultData)
  });
})
//삭제
router.delete('/:id', (req, res) => {
  const id = req.params.id
  let sql = "DELETE FROM customers WHERE id=?"
  pool.query(sql, id, function (err, results, fields) {
    if (err) { console.log(err) } //error시 콘솔출력
    res.statusCode = 200
    res.end();
  });
})

module.exports = router;