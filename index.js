const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/tic-tac-toe', function(req, res) {
  res.sendFile(__dirname + '/tic-tac-toe.html')
})

app.get('/space-invaders', function(req, res) {
  res.sendFile(__dirname + '/space-invaders.html')
})

app.get('/hangman', function(req, res) {
  res.sendFile(__dirname + '/hangman.html')
})

app.get('/pong', function(req, res) {
  res.sendFile(__dirname + '/pong.html')
})

app.get('/number-merge', function(req, res) {
  res.sendFile(__dirname + '/number-merge.html')
})

app.get('/rock-paper-scissor', function(req, res) {
  res.sendFile(__dirname + '/rock-paper-scissor.html')
})

app.listen(3000, function() {
    console.log("Listening at port 3000")
})
