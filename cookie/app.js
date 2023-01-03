const http = require('http')
const cookie = require('cookie') //쿠키 모듈 불러오기

http.createServer((req, res) => {
  var cookies; //쿠키 변수 선언
  if (req.headers.cookie) { // 쿠키가 있다면 실행
    cookies = cookie.parse(req.headers.cookie);//쿠키 parse
    console.log(cookies.username)
  }
  console.log(cookies)
  res.writeHead(200, { //쿠키 세팅할때
    'Set-Cookie': ["yummy_cookie=choco",
      // 브라우저 창을 닫으면 사라짐
      `username=hong; Max-Age=${2 * 60}`]
  })
  res.end('hello')
}).listen(3000, () => { //메소드 체인
  console.log("server running http://localhost:3000")
})
