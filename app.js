const express = require('express');
const path = require('path');
var ejs = require('ejs');


const app = express();


// const myLogger = (req, res, next) => {
//   console.log('Middleware log');
//   next();//bir sonraki middleware e ilerlemek icin kullaniyor
// }
// const myLogger2 = (req, res, next) => {
//   console.log('Middleware log 2');
//   next();//bir sonraki middleware e ilerlemek icin kullaniyor
// }

//TEMPLATE ENGINE

app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extend:true})) //url deki datayi okumammizi sagliyor
app.use(express.json());//url deki datayi json formatina donduruyor.
// app.use(myLogger);
// app.use(myLogger2);

app.get('/', (req, res) => {
  //   const photo = {
  //       id: 5,
  //       name: "Photo Name",
  //       description: "Photo description",
  //   }
  // res.send(photo);
    // res.sendFile(path.resolve(__dirname, 'temp/index.html'))
  res.render('index');
});
app.get('/about', (req, res) => {

  res.render('about')
});
app.get('/add', (req, res) => {

  res.render('add')
});
app.get('/video-page',(req, res) => {

    res.render('video-page')
});
app.post('/photos',(req, res) => { //yonledirneyi yakalayip 
  //yapmasi gereken islem
    console.log(req.body); //Forma girilen verileri yazdirmak istiyoruz.
    res.redirect('/');
});
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} una baglandi`);
});
