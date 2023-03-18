const express = require('express')
require('dotenv').config()
var mongoose = require("mongoose");
const router = express.Router();
const app = express()
const port = process.env.PORT || 8080
mongoose.set('strictQuery', false);
require('./db')
const user = require('./models/user')

app.get('/add', () => {
 
  user.create({
    username: 'testqq',
    email : 'testq@example.com',
    password: 'test1q11111',
    phone: '9724855508'
  });

});

app.get('/test1', () => {
  console.log('oojj');
  var userdata = user.find();
  console.log(userdata);
  return true;
});

app.get('/user',(req , res) => {
  const data= user.find({}).then(function (users) {
    res.send(users);
  });
  console.log(data);
})

app.get('/findOne/:id',(req , res) => {
  // const findOne = user.findOne({username:'test'}).then(function (usersa) {
  const{id} = req.params
  console.log(id);
  user.findOne({_id:id}).then(function (usersa) {
    res.send(usersa);
    console.log(usersa);
  });
})

app.get('/findOne/:id',(req , res) => {
  // const findOne = user.findOne({username:'test'}).then(function (usersa) {
  const{id} = req.params
  console.log(id);
  user.findOne({_id:id}).then(function (usersa) {
    res.send(usersa);
    console.log(usersa);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})