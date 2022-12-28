import { Router } from 'express';
const route = Router();


// 아래 코드는 app.js 에서 가지고 와서  첫 줄의 app('/customer) 부분만 route('/customer) 로 바꿈.
route
    .get('/', (req, res) => {           // .get('/customer')  하면 안 된다!  이미 app.js 에서  /customer 로 요청 들어온 것만 여기까지 오도록 필터링 했음.
        res.send('GET 요청!')           // 만약 .get('/customer')  라고 하면 URL이 /customer/customer  가 됨.  (중복)
    })
    .post('/', (req, res) => {
        res.send('POST 요청!')
    })


// 외부에서 접근 가능하게 만듦.         app.js 에서 임포트 할거임.
export default route;