var express = require("express");
const pool = require("../test/pool")
var router = express.Router();

sql = {
  select: "SELECT * FROM books order by title",
  selectOne: "SELECT * FROM books WHERE no=?",
  insert: "INSERT INTO books SET ?",
  update: "UPDATE books SET ? WHERE no= ?",
  delete: "DELETE FROM books WHERE no=?"
}

//전체 조회
router.get('/', (req, res) => {
  pool.query(sql.select, function (err, results, fields) {
    if (err) { console.log(err) }
    res.json(results)//json 방식으로 자동으로 바뀜
  })
})

//단건조회
router.get('/:no', (req, res) => {
  const no = req.params.no
  pool.query(sql.selectOne, no, function (err, results, fields) {
    if (err) { console.log(err) }
    res.json(results[0])//들어온 정보가 배열이라 그걸 꺼내기위해 배열로 뽑음
  })
})

//등록
router.post('/', (req, res) => {
  pool.query(sql.insert, req.body, function (err, results, fields) {
    if (err) { console.log(err) } //error시 콘솔출력
    res.json(results)
  });
})

//수정
router.put('/:no', (req, res) => {
  let data = [req.body, req.params.no]// ? 받는개 2개니 배열로 받음
  pool.query(sql.update, data, function (err, results, fields) {//data를 요청해야함
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
router.delete('/:no', (req, res) => {
  const no = req.params.no
  pool.query(sql.delete, no, function (err, results, fields) {
    if (err) { console.log(err) } //error시 콘솔출력
    res.statusCode = 200
    res.end();
  });
})

module.exports = router;