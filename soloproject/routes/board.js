var express = require("express");
var ejs = require("ejs")
var fs = require("fs")
const pool = require("../test/pool");
var router = express.Router();

//사용하기 쉽게 한번에 선언해서 필요한 것 만 빼오기
sql = {
  select: "SELECT * FROM board",
  selectOne: "SELECT * FROM board WHERE no=?",
  insert: "INSERT INTO board SET ?",
  update: "UPDATE board SET ? WHERE no= ?",
  delete: "DELETE FROM board WHERE no=?",
};

router.get("/", (req, res) => {
  pool.query(sql.select, (err, results) => {
    if (err) throw err;
    else { res.render('../views/board', { data: results }) }
  })
})
router.get('/mysql', (req, res) => {
  pool.query(sql.select, (err, results) => {
    res.send(results)
  })
})

// "/"은 app.js에서 선언한 라우터 뒤에 뭍는거 
// /board/ 일때 작동
// router.get("/", (req, res) => {
//   pool.query(sql.select, (err, rows) => {
//     if (err) throw err;
//     res.render("board", {
//       boards: rows
//     });
//   });
// })

// /board/add 일때 작동
router.get('/add', (req, res) => {
  res.render("boardadd")
})

// /board/save 일때 작동
router.post('/save', (req, res) => {
  pool.query(sql.insert, req.body, (err, results) => {
    if (err) { throw err } //error시 콘솔출력
    res.redirect('/board')

  })
})

// /board/upd 일때 작동
router.get('/upd/:no', (req, res) => {
  const no = req.params.no
  pool.query(sql.selectOne, no, (err, results) => {
    if (err) throw err;
    res.render('boardupd', {
      board: results[0]
    })
  })

})

// /board/put 일때 작동
router.post('/put', (req, res) => {
  const no = req.body.no

  let sqlupd =
    "UPDATE board SET title='" + req.body.title + "', contents ='" + req.body.contents + "' WHERE no =" + no;

  pool.query(sqlupd, (err, results) => {
    if (err) throw err;
    res.redirect('/board')
  })


})

// /board/del 일때 작동
router.get('/del/:no', (req, res) => {
  const no = req.params.no
  pool.query(sql.delete, no, (err, results) => {
    if (err) throw err;
    res.redirect('/board')

  })
})

module.exports = router;