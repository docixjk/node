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
let sql = "INSERT INTO customers SET ?" //SET을 적으면 뒤에 들어올 것을 알아서 정리해줌
let data = { //추가할 data 넣기
  name: "몽철식",
  email: "mong@naver.com",
  phone: "010-6623-4546",
  address: ""
}
//sql을 넣어 요청 data를 담아서  받아올것은 err와 results(fields)를 받을거야
connection.query(sql, data, function (err, results, fields) {
  if (err) { console.log(err) } //error시 콘솔출력
  console.log(results)
  connection.query("SELECT LAST_INSERT_ID()", (err, results) => {
    console.log("id:", results)
  })
});

connection.end() //DB 접속 종료