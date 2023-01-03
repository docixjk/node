var express = require("express");
var mysql = require("mysql");
const pool = require("../test/pool")
var fs = require("fs");
var ejs = require("ejs");
var router = express.Router();

sql = {
  select: "SELECT * FROM login",
  selectOne: "SELECT * FROM login WHERE no=?",
  insert: "INSERT INTO login SET ?",
  update: "UPDATE login SET ? WHERE no= ?",
  delete: "DELETE FROM login WHERE no=?"
}
router.get('/', (req, res) => {
  res.redirect('login.html')
})
router.post("/login", (req, res) => {
  let data = {
    userid: req.body.userid,
    userpw: req.body.userpw
  }
  pool.query(sql.insert, data, function (err, results) {
    if (err) { throwerr } //error시 콘솔출력
    res.redirect('loginSus.html')
  });
})

module.exports = router;
