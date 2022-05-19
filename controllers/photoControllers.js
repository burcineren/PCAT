const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  //   const photo = {
  //       id: 5,
  //       name: "Photo Name",
  //       description: "Photo description",
  //   }
  // res.send(photo);
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'))

  const photos = await Photo.find({}).sort('-dateCreated'); //veritabanindaki fotograflari goruntulemek icin (burada fotograflari yakalayip)
  res.render('index', {
    photos, //fotograflari burada gonderiyoruz
  });
};

exports.getPhoto = async (req, res) => {
  //console.log(req.params.id);//parametre olarak gonderilen id yi yakaladik
  //res.render('about')
  const photo = await Photo.findById(req.params.id); // findById secili olan id ye gore fotograf bilgileri aldik
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  //console.log(req.files.image); //image inputun name i
  //yonledirneyi yakalayip
  //yapmasi gereken islem
  // console.log(req.body); //Forma girilen verileri yazdirmak istiyoruz.
  //await Photo.create(req.body); //Ireq.body ilgili modelimize yonlendiyoruz.
  // res.redirect('/'); //Anasayfa yonlendiriliyor.

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
};
exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
