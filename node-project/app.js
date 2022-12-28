import express from 'express'
import boardRouter from './routes/board.js'           // board.js  읽어들임 (임포트하는거다)
import customerRouter from './routes/customer.js'     // customer.js  읽어들임 (임포트하는거다)
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//가상경로를 '',안에 만들어줌 
app.use(express.static("public"))
//이런 식으로 express 사용시 route를 분리해서 사용할 수 있다.
app.get("/login", (req, res) => {
    console.log(req.query.email)
    res.send("로그인 칸료")
})

// /board 로 들어올 경우,  boardRouter 로 가서 타입(get, post, put, delete)별로 처리해라
app.use('/board', boardRouter);
// /customer 로 들어올 경우,  customerRouter 로 가서 타입(get, post, put, delete)별로 처리해라
app.use('/customer', customerRouter);
app.use((err, req, res, next) => {
    res.status(500).json({ code: res.statusCode, msg: err.message }) //json구조로 보내줘
})
app.get(
    "/example",
    (req, res, next) => { //next를 넣고 중괄 안에 next넣으면 다음 핸들러로 넘어감
        throw new Error("에러발생")
        console.log("첫콜")
        next() //다음 요청으로 넘김
    },
    (req, res) => {
        res.send("두콜")
    }
)


// http://localhost:3000/
app.get('/', (req, res) => {
    // route 안에 들어오면 이 블록 안에서 처리하는 함수들을 핸들러 라고 한다.
    res.send('Hello World! This is Express!')
})


/*
    // 아래 코드들을 routes/customer.js  로 잘라내기 했음

    app.get('/customer', (req, res) => {
        // route 안에 들어오면 이 블록 안에서 처리하는 함수들을 핸들러 라고 한다.
        res.send('GET 요청!')
    })

    // POST 방식은 URL 에서 테스트 불가함.  포스트맨 사용하자!
    app.post('/customer', (req, res) => {
        res.send('POST 요청!')
    })
*/

/*
    // 아래 코드들을 routes/board.js  로 잘라내기 했음


    //app.route()   중요!!!     교재 p.122
        // http://localhost:3000/board 에 들어갔을 때, 메서드 방식에 따라 다른 결과값 나오게
    app.route('/board')
        .get((req, res) => {
            res.send('board GET')
        })
        .post((req, res) => {
            res.send('board POST')
        })
        .put((req, res) => {
            res.send('board PUT')
        })
        .delete((req, res) => {
            res.send('board DELETE')
        })
*/


/*
    정규식 : 교재 p. 64

    참고 : https://blog.minov.co.kr/entry/PHP-이름이메일전화번호우편번호등-정규식
    참고2: https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions
*/

// 교재 p. 119.     문자열 패턴(정규식) 으로   route 경로를 정해줄 수도 있다!
app.get('/ab?cd', (req, res) => {   // acd   abcd   (b 가 하나 있는지 없는지..?)
    res.send('정규표현식')
})


app.listen(port, () => {
    console.log(`Server is Running~~ http://localhost:${port}`)
})