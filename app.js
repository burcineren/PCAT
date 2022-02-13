const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

var ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');





const app = express();

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



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
app.use(bodyParser.urlencoded({ extended: true })); //url deki datayi okumammizi sagliyor
app.use(express.json());//url deki datayi json formatina donduruyor.
// app.use(myLogger);
// app.use(myLogger2);

//ROUTES
app.get('/', async (req, res) => {
  //   const photo = {
  //       id: 5,
  //       name: "Photo Name",
  //       description: "Photo description",
  //   }
  // res.send(photo);
    // res.sendFile(path.resolve(__dirname, 'temp/index.html'))

  const photos = await Photo.find({}) //veritabanindaki fotograflari goruntulemek icin (burada fotograflari yakalayip)
  res.render('index', {
     photos,//fotograflari burada gonderiyoruz
  });
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
app.post('/photos', async (req, res) => { //yonledirneyi yakalayip 
  //yapmasi gereken islem
    // console.log(req.body); //Forma girilen verileri yazdirmak istiyoruz.
    await Photo.create(req.body); //Ireq.body ilgili modelimize yonlendiyoruz.
    res.redirect('/'); //Anasayfa yonlendiriliyor.

});
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} una baglandi`);
});
