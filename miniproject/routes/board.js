var express = require("express");
const pool = require("../test/pool");
var router = express.Router();

sql = {
  select: "SELECT * FROM board",
  selectOne: "SELECT * FROM board WHERE no=?",
  insert: "INSERT INTO board SET ?",
  update: "UPDATE board SET ? WHERE no= ?",
  delete: "DELETE FROM board WHERE no=?",
};

router.get("/", (req, res) => {
  let sqlpage = "select * from board LIMIT 0, 10;"
  pool.query(sqlpage, (err, rows) => {
    if (err) throw err;
    res.render("board", {
      boards: rows
    });
  });
})


router.get('/add', (req, res) => {
  res.render("boardadd")
})

router.post('/save', (req, res) => {
  pool.query(sql.insert, req.body, (err, results) => {
    if (err) { throw err } //error시 콘솔출력
    res.redirect('/board')

  })
})

router.get('/upd/:no', (req, res) => {
  const no = req.params.no
  pool.query(sql.selectOne, no, (err, results) => {
    if (err) throw err;
    res.render('boardupd', {
      board: results[0]
    })
  })

})
router.post('/put', (req, res) => {
  const no = req.body.no

  let sqlupd =
    "UPDATE board SET title='" + req.body.title + "', contents ='" + req.body.contents + "' WHERE no =" + no;

  pool.query(sqlupd, (err, results) => {
    if (err) throw err;
    res.redirect('/board')
  })


})
router.get('/del/:no', (req, res) => {
  const no = req.params.no
  pool.query(sql.delete, no, (err, results) => {
    if (err) throw err;
    res.redirect('/board')

  })
})

module.exports = router;