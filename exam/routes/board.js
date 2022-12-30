var express = require('express');
//pool.js 로 mysql과 연결 시켜준다 pool 파일에는 mysql에 관한 정보를 넣어준다
const pool = require("../test/pool") // test폴더를 만들고 그안에 pool 값을 넣어 서버와 연결 시킴
var router = express.Router();

sql = { //라우터 요청 하나 하나 넣기 번거로우니 배열로 만들어준다
  //사용시 sql.을 붙이고 원하는 것을 넣어준다
  select: "SELECT * FROM board",
  //board 테이블 전체 조회

  insert: "INSERT INTO board SET ?",
  //board 테이블에 value (무엇을 넣을 것이다)

  update: "UPDATE board SET ? WHERE no= ?",
  //board 테이블 몇 번의 어떤 값을 바꿀 것이다

  delete: "DELETE FROM board WHERE no=?"
  //board 테이블 몇 번을 지울 것이다
}
//전체 조회
router.get('/', (req, res) => {
  //req는 받아오는 값(요청), res는 응답해주는 값(결과처리)
  pool.query(sql.select, function (err, results, fields) {
    if (err) { console.log(err) } //error시 출력
    res.json(results) //정상작동이면 값을 돌려준다
  })
})


//등록
router.post('/', (req, res) => {
  //등록하기 때문에 insert 값을 주고 요청하는 내용은 req.body이다
  //그리고 결과 값은 results로 작동이 되면 res.json으로 돌려준다
  pool.query(sql.insert, req.body, function (err, results, fields) {
    if (err) { console.log(err) }
    res.json(results)
  });
})

//수정
router.put('/:no', (req, res) => {
  //해당하는 것만 수정하기 위해서 no를 잡아줘야한다
  //수정하기 위해서는 두가지의 ?가 들어가기 때문에 변수는 배열로 준다
  let data = [req.body, req.params.no]
  //UPDATE board SET ? WHERE no= ?
  //SET 뒤에는 요청하는 내용 req.body 를 넣고 해당 no를 찾기위해 params를 이용한다
  pool.query(sql.update, data, function (err, results, fields) {
    let resultData = {} // 수정해서 돌려주는 값도 배열로 주어야 받을 수 있다.
    if (err) {
      console.log(err)
    }
    if (results.changedRows > 0) { //changedRows : 실제로 update된 rows 수
      resultData.result = true
      resultData.data = req.body
    } else {
      resultData.result = false //수정 값이 없거나 실패한다면
    }
    res.send(resultData) //넘겨주는 값은 수정된 값
  });
})

//삭제
router.delete('/:no', (req, res) => {
  const no = req.params.no // no값을 받기위한 변수 선언
  pool.query(sql.delete, no, function (err, results, fields) {
    if (err) { console.log(err) }
    res.statusCode = 200
    res.end();
  });
})

module.exports = router;