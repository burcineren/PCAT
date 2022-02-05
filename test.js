const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema); //yeni bir model olusturilcak (PhotoSchema yi baz alarak)

//create a photo object

// Photo.create({
//   title: 'Photo Title 11',
//   description: 'Photo description 11 lorem ipsum',
// });

//read a photo
// Photo.find({}, (err, data) => {
//   console.log(data);
// });

//update a photo
//guncelleme yapildi
// const id = '61f542b7385b5f917afc4ca3';

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo 222 Updated',
//     description: 'Photo description 222 updated',
//   },
//     {
//         new: true
//     },
//   (err, data) => {
//     console.log(data);
//   }
// );

//delete a photo
const id = '61f542b7385b5f917afc4ca3';
Photo.findByIdAndDelete(id, (err, data) => {
  console.log('phote is removed.');
});
