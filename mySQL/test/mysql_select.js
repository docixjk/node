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

sql = "SELECT * FROM customers";
connection.query(sql, function (err, results, fields) {
  console.log(results)
});

connection.end() //DB 접속 종료