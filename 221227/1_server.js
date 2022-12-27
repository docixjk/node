const http = require('http'); // http.js(module)의 http 객체 참조
const fs = require('fs'); //파일 처리 관련 모듈
//서버 선언 ↓( 클라이언트 요천시 호출(처리)될 hendler )↓
const server = http.createServer((req, res) => {
  //완벽한 url을 위해서 호스트주소를 넣어준다
  const myurl = new URL("http://127.0.0.1:3000" + req.url);
  console.log('pathname : ' + myurl.pathname);// / 뒤를 읽어줌
  console.log('serchparam : ' + myurl.searchParams);// ? 뒤를 읽어줌
  if (myurl.pathname.startsWith("/page")) {
    //pathname이 xxxxx으로 시작할때 씀 -> startsWith
    const pagename = './template' + myurl.pathname.substring(5) + '.html';
    fs.readFile(pagename, 'utf8', (err, data) => {
      //read가 끝나면 파일내용이 두번째 인수로 넘어감
      res.end(data);
    });
  } else { res.end("no path") }

});

server.listen(3000, () => { //서버가 정상적으로 돌아간다는 뜻
  console.log('server running http://127.0.0.1:3000');
});