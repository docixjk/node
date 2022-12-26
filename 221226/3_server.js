const http = require('http'); //http 웹서버 구축
let infoArr = []; //info 배열 추가
infoArr['kim'] = { name: '김또깡', hobby: '주먹질' };
infoArr['pack'] = { name: '박대기', hobby: '도촬' };
const server = http.createServer((req, res) => { //요청 처리 
  const myurl = new URL("http://127.0.0.1:3000" + req.url);
  console.log(myurl.pathname);
  console.log(myurl.searchParams);
  if (myurl.pathname == "/") {
    res.end("main");
  } else if (myurl.pathname == "/info") {
    // res.statusCode = 200; //정상처리 코드확인
    // res.setHeader("content-type", "text/html"); //어떻게 처리할 것인지
    //text를 html로 연다는 의미
    //application/octet-stream을 쓰면 info 파일 다운받아짐
    let userid = myurl.searchParams.get("userid");
    //주소창에서 입력받아서 param userid 뽑아오기;
    if (!userid) { //userid 유무 확인후 출력
      res.end("no user");
      return;
    }
    let html = `<!DOCTYPE html>
                <html lang="ko">
                  <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>info</title>
                  </head>
                  <body>
                    <h3>my info</h3>
                    <div>아디 : ${userid ? userid : ''}</div>
                    <div>이름 : ${infoArr[userid].name}</div>
                    <div>게임 : ${infoArr[userid].hobby}</div>
                  </body>
                </html>`;
    res.write(html);
    res.end();
  } else if (myurl.pathname == "/boardRegAction") {
    let boardReg = `
      <!DOCTYPE html>
      <html lang="ko">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>boardReg</title>
          <style>
            li { list-style: none;
              margin-bottom: 10px;}
            h3 {
              text-align: center;
            }
            form {
              width: 100%;
              text-align: center;
              margin: 0 auto;
            }
          </style>
        </head>
        <body>
          <h3>게시글 작성</h3>
          <form action="/boardRegAction">
            <ul>
              <li>
                <label for="u_name">이름 : </label>
                <input name="title" id="u_name" type="text" />
              </li>
              <li>
                <label for="u_tel">전화번호 : </label>
                <input id="u_tel" type="tel" />
              </li>
              <li>
                <label for="u_email">이메일 : </label>
                <input id="u_email" type="email" />
              </li>
            </ul>
            <li>
              <textarea name="content" id="txt_a" cols="30" rows="10"></textarea>
            </li>
            <button>추가</button>
            <button>삭제</button>
          </form>
        </body>
        </html>
        `
    res.write(boardReg);
  }
  else if (myurl.pathname == "/boardRegAction") {
    let title = myurl.searchParams.get("title");//url안에 있는 정보를 읽어 내는거
    let content = myurl.searchParams.get("content");
    console.log("title");
    console.log("content");
    res.end("등록완료");
  } else {
    res.statusCode = 404;
    res.end(); // 마침은 무조건
  }
  // console.log(myurl.pathname); //res 콘솔 출력
  // res.write("hello"); //입력한걸 화면에 출력
  // res.end(); // res 입력 끝
});
server.listen(3000, () => { //서버 구축 (포트는 마음대로)
  console.log('server is running http://127.0.0.1:3000');
}); 