var express = require("express");
var mysql = require("mysql");
const pool = require("../test/pool");
var fs = require("fs");
var ejs = require("ejs");
var router = express.Router();

sql = {
  select: "SELECT * FROM board",
  selectOne: "SELECT * FROM board WHERE no=?",
  insert: "INSERT INTO board SET ?",
  update: "UPDATE board SET ? WHERE no= ?",
  delete: "DELETE FROM board WHERE no=?",
};
router.get('/', (req, res) => {
  res.render('login') //첫번째 화면 불러오기
})

router.get("/lostark", (req, res) => {
  res.redirect('lostark.html')
})
router.get("/board", (req, res) => {
  pool.query(sql.select, (err, rows) => {
    if (err) throw err;
    res.render("board", {
      boards: rows
    });
  });
})


router.get('/board/add', (req, res) => {
  res.render("boardadd")
})
router.post('/board/save', (req, res) => {
  let data = {
    userid: req.body.userid,
    title: req.body.title,
    contents: req.body.contents
  }
  pool.query(sql.insert, data, (err, results) => {
    if (err) { throw err } //error시 콘솔출력
    res.redirect('/board')

  })
})

router.put('/board/upd/:userid', (req, res) => {
  const userid = req.params.userid
  let findid = `SELECT * FROM board WHERE userid=?`

  pool.query(findid, (err, results) => {
    if (err) throw err;
    res.render('boardupd', {
      board: results[0]
    })
  })
})

module.exports = router;
