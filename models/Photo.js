const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const PhotoSchema = new Schema({
//   title: String,
//   description: String,
//   image: String, //Gorselin adresi oldugu icin string degiri donduruyoruz
//   dateCreated: { type: Date, default: Date.now }, //fotografin yuklenme tarihi
// });
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
const Photo = mongoose.model('Photo', PhotoSchema); //yeni

// const id = '61f542b7385b5f917afc4ca3';
// Photo.findByIdAndDelete(id, (err, data) => {
//   console.log('phote is removed.');
// });
module.exports = Photo;