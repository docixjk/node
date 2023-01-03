var express = require("express");
var mysql = require("mysql");
const pool = require("../test/pool");
var fs = require("fs");
var ejs = require("ejs");
var router = express.Router();

sql = {
  select: "SELECT * FROM login",
  selectOne: "SELECT * FROM login WHERE no=?",
  insert: "INSERT INTO login SET ?",
  update: "UPDATE login SET ? WHERE no= ?",
  delete: "DELETE FROM login WHERE no=?",
};

router.get("/", (req, res) => {
  pool.query(sql.select, (err, rows) => {
    if (err) throw err;

    res.render("board", {
      board: rows,
    });
  });
});

module.exports = router;
