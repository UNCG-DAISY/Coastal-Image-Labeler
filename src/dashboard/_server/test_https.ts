var express = require('express')
var fs = require('fs')
var https = require('https')
var app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

const keyFolder = '/etc/letsencrypt/live/coastalimagelabeler.science';
const options = {
  key: fs.readFileSync(`${keyFolder}/privkey.pem`, 'ascii'),
  cert: fs.readFileSync(`${keyFolder}/cert.pem`, 'ascii')
}

// let server = https.createServer({
 
// }, app).listen(5000, function () {
//   console.log('HTTPS --> Go to https://localhost:5000/')
// })


https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world 1111111111111111111111111111111\n");
}).listen(5000);