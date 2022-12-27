/* work.js */
const http = require('http');
let todoList = [
  { content: 'test1', completed: false },
  { content: 'test2', completed: true },
  { content: 'test3', completed: false },
  { content: 'test4', completed: false }
];

const server = http.createServer((req, res) => {
  //서버 요청 처리사항
  const myUrl = new URL('http://127.0.0.1:3000' + req.url);
  if (myUrl.pathname == '/todoList') {//todoList 전부 받아오기
    res.end(JSON.stringify(todoList)); //todoList내용을 스트링으로 변환
  } else if (myUrl.pathname == '/todo') { //todo?no=1  한건만 받아오도록
    let no = myUrl.searchParams.get('no')
    res.end(JSON.stringify(todoList[no]))
  }

})
server.listen(3000, () => {//서버 포트설정
  console.log('server running http://127.0.0.1:3000')
});


