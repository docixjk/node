import { Router } from 'express';
const route = Router();


// 아래 코드는 app.js 에서 가지고 와서  첫 줄의 app('/board) 부분만 route('/board) 로 바꿈.
route
    .get('/', (req, res) => {
        // .get('/board')  하면 안 된다!  이미 app.js 에서  /board 로 요청 들어온 것만 여기까지 오도록 필터링 했음.
        //?writer = kim   
        console.log('writer : ', req.query.writer)
        console.log('telnum : ', req.query.telnum)
        res.send('board GET') // 만약 .get('/board')  라고 하면 URL이 /board/board  가 됨.  (중복)
    })
    .post('/', (req, res) => {
        console.log("title: ", req.body.title)
        console.log("contents: ", req.body.contents)
        console.log("writer: ", req.body.writer)
        res.send('board POST')
    })
    .put('/', (req, res) => {
        res.send('board PUT')
    })
    .delete('/:boardno', (req, res) => {
        console.log("boardno : ", req.params.boardno)
        res.send('board DELETE')
    })


// 외부에서 접근 가능하게 만듦.         app.js 에서 임포트 할거임.
export default route;