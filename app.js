const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/Photo');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

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
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); //url deki datayi okumammizi sagliyor
app.use(express.json()); //url deki datayi json formatina donduruyor.4//defoult option
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
// app.use(myLogger);
// app.use(myLogger2);

//ROUTES
app.get('/',  photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.createPhoto);

app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/video-page', (req, res) => {
  res.render('video-page');
});


app.get('/photos/edit/:id', pageController.getEditPage);


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portuna baglandi`);
});
