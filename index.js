const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const checkCookie = (req, res, next) => {
  if(!req.cookies.name){
    res.send("You need to login")
  }
  next();
}

app.use(checkCookie);

app.get('/', (req, res) => {
  if(req.cookies.name){
    res.send("Home");
  }
})

app.get('/login', (req, res) => {
  const {username, password} = req.query;
  if(username === 'admin' && password === '123'){
    res.cookie('name', username, {httpOnly: true});
    res.send('login successful');
  }else{
    res.status(404).send('login failed');
  }
})

app.get('/get-cookie', (req, res) => {
  res.send(`Your cookie is as following: \n ${req.cookies.name}`)
})

app.get('/logout', (req, res) => {
  res.clearCookie('name');
  res.send('remove cookie successfully');
})

app.listen(80, () => {
  console.log('Running on 80 port...')
})