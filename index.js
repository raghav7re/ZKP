const Web3=require('web3')

const express = require('express')
const path = require('path');
const app = express()
const port = 3001

const web3 = new Web3("ws://127.0.0.1:8545");

const re=web3.eth.getBlockNumber();
console.log(re);
app.use(express.static(path.join(__dirname, "static")));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});


app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
