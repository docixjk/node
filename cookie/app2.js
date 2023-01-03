const express = require("express")
var cookieParser = require("cookie-parser")
const app = express()
app.use(cookieParser())
app.get("/", (req, res) => {
  //cookie
  console.log("cookies: " + req.cookies.test)
  res.cookie("test", "test")
  res.send("express")
})

app.listen(3000, () => { //메소드 체인
  console.log("server running http://localhost:3000")
})
