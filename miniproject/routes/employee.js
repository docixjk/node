var express = require("express");
var app = express.Router();             // 여기를 var router 로 하면, 밑에 전부 router 로 바꿔야 함.
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'dev01',
    password: '1234',
    database: 'dev',
    connectionLimit: 10
});

connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('DB 연결 성공!');
    }
});


// 초기 화면, 전체 직원 조회  (employee_index.ejs)
app.get('/', (req, res) => {
    let sql = "SELECT * FROM employees";

    connection.query(sql, (err, rows) => {
        if (err) throw err;

        // 에러가 없다면,  employee_index.ejs 의 employees 자리에다가 데이터 값(rows) 을 넣는다.
        res.render('employee_index', {
            employees: rows
        });
    });
});


// employee_add.ejs 화면 보여줌.
// ajax 쓸 때만 get/post/put/delete 쓴다.
// 내 경우에는 상관 없음. 굳이 저렇게 4개 나눠쓰려면 ejs 파일의 form 태그 내에서도 put, delete 등 쓰면 됨.
app.get('/add', (req, res) => {
    res.render('employee_add', {
    });
});

// employee_add.ejs 에서 전달받은 입력 정보들을 DB에 담는다.
app.post('/save', (req, res) => {
    let sql = "INSERT INTO employees SET ?";

    let data = {
        name: req.body.name,
        email: req.body.email,
        position: req.body.position
    };

    let query = connection.query(sql, data, (err, results) => {
        if (err) {
            throw err;
        }

        // 성공적으로 담았다면 다시 초기 화면으로   (employee_index.ejs)
        res.redirect('/');
    });
});


// 정보 수정 버튼 클릭
app.get('/edit/:employeeId', (req, res) => {
    // /edit 뒤로 넘어온 employeeId 를 변수에 저장 (해당 숫자는 사번이다.)
    const employeeId = req.params.employeeId;

    let sql = `SELECT * FROM employees WHERE id = ${employeeId}`;

    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        // employee_edit.ejs 의 employee 자리에다가 해당 데이터(result[0]) 를 넣는다.
        res.render('employee_edit', {
            employee: result[0]
        });
    });
});


// employee_edit.ejs 로부터 수정된 정보 데이터를 전달받아서, DB에 저장하는 곳. 
// put 으로 안 됐음.   아마도 전달 받은 데이터를 DB에 삽입하기 때문에.. POST?
app.post('/update', (req, res) => {
    const employeeId = req.body.id;

    let sql =
        "update employees SET name='" + req.body.name + "',  email='"
        + req.body.email + "',  position='" + req.body.position + "' where id ="
        + employeeId;

    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        }

        // 정상적으로 정보 수정 및 저장이 됐다면, 다시 초기 화면으로   (employee_index.ejs)
        res.redirect('/');
    });
});


// 정보 삭제  (DELETE 안 됨)
app.get('/delete/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;

    // 여기서 바로 그냥 삭제함
    let sql = `DELETE from employees where id = ${employeeId}`;

    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        // 정상적으로 정보 삭제가 됐다면, 다시 초기 화면으로   (employee_index.ejs)
        res.redirect('/');
    });
});


// 라우터 익스포트 시켜주자
module.exports = app;