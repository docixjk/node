const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write("<html>");
  res.write("<body><table border='1'>");
  for (let i = 1; i < 10; i++) {
    res.write("<tr><td>" + i + "</td></tr>");
  }
  res.end("</table></body></html>");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});