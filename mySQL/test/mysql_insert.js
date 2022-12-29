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

//node 문법 - INSERT INTO () VALUE ()와 같음
let sql = "INSERT INTO customers SET ?"
let data = { //추가할 data 넣기
  name: "몽철식",
  email: "mong@naver.com",
  phone: "010-6623-4546",
  address: ""
}

connection.query(sql, data, function (err, results, fields) {
  if (err) { console.log(err) } //error시 콘솔출력
  console.log(results)
});

connection.end() //DB 접속 종료