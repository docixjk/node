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

//node 문법 - UPDATE () WHERE ()와 같음
// ?가 두개 이상일때는 배열로 넣어주어야함
let sql = "UPDATE CUSTOMERS SET ? WHERE id=?"
//수정할 값을 넣어주고 {}, 뒤에는 수정할 id 값을 넣어준다
let data = [{ email: "park@gmail.com", name: "pack" }, 2]

connection.query(sql, data, function (err, results, fields) {
  if (err) { console.log(err) } //error시 콘솔출력
  console.log(results)
});

connection.end() //DB 접속 종료