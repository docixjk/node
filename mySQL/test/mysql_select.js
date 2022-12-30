const mysql = require("mysql"); //mysql 모듈 로드

//mysql 접속 정보
const conn = {
  host: "localhost",
  port: "3306",
  user: "dev01",
  password: "1234",
  database: "dev"
};

let connection = mysql.createConnection(conn); //DB 커넥션생성
connection.connect(); //DB 접속

sql = "SELECT * FROM customers"; //mySQL에서 받아온 컬럼정보
//서버에 sql을 해주세요 그뒤 핸들러로 받아오는거(요청 -> 처리)
connection.query(sql, function (err, results, fields) {
  if (err) { throw err } //err시 어떤 err인지 보여줌
  console.log(results)
});

connection.end() //DB 접속 종료