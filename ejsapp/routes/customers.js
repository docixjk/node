const express = require("express");
const pool = require("../mysql/pool")
const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM customers"
  pool.query(sql, (err, result, fields) => { //fields 안쓰면 생략 가능
    //EJS 템플릿 사용법
    res.render("customers", { list: result }) //내놓을 파일 이름
    //ejs 파일에서
    /*
      <% 자바스크립트코드 %>
      <%= (출력)변수 또는 수식 %>
    */
  })
})


module.exports = router;