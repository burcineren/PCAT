const express = require('express');
const path = require('path');
const app = express();

// const myLogger = (req, res, next) => {
//   console.log('Middleware log');
//   next();//bir sonraki middleware e ilerlemek icin kullaniyor
// }
// const myLogger2 = (req, res, next) => {
//   console.log('Middleware log 2');
//   next();//bir sonraki middleware e ilerlemek icin kullaniyor
// }

//MIDDLEWARES
app.use(express.static('public'))
// app.use(myLogger);
// app.use(myLogger2);

app.get('/', (req, res) => {
  //   const photo = {
  //       id: 5,
  //       name: "Photo Name",
  //       description: "Photo description",
  //   }
  // res.send(photo);
    res.sendFile(path.resolve(__dirname, 'temp/index.html'))
});
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} una baglandi`);
});
