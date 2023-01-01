const http = require("http");

const express = require("express");

// const mysql = require('mysql');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("hello world");
});

app.listen(port, () => console.log(`http://localhost:${port}`));
