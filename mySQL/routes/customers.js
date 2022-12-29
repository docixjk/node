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
  const id = req.params.id
  let sql = "UPDATE CUSTOMERS SET ? WHERE id=?"
  pool.query(sql, req.body, id, function (err, results, fields) {
    if (err) { console.log(err) } //error시 콘솔출력
    res.json(results)
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