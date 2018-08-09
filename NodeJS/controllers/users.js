var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var nodemailer = require('nodemailer');
const multer = require("multer");
var fs = require('fs');

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {
  var user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    // password: User.hashPassword(req.body.password),
    // verify: User.hashPassword(req.body.verify)
    password: req.body.password,
    verify: req.body.verify
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function (err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({ message: 'Login Success' });
    });
  })(req, res, next);
});

router.get('/profile', isValidUser, function (req, res, next) {
  return res.status(200).json(req.user);
});

router.get('/logout', isValidUser, function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: 'Logout Success' });
})

function isValidUser(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized Request' });
  }
}

// PROFILE PICTURE
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../uploads/images');
//   },
//   filename: function (req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
//       var err = new Error();
//       err.code = 'filetype';
//       return cb(err);
//     } else {
//       cb(null, file.originalname);
//     }
//   }
// });

// var upload = multer({
//   storage: storage,
//   limits: { fileSize: 10000000 }
// }).single('image');

// router.post('/upload', function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       if (err.code === 'LIMIT_FILE_SIZE') {
//         res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
//       } else if (err.code === 'filetype') {
//         res.json({ success: false, message: 'Filetype is invalid. Must be .png' });
//       } else {
//         res.json({ success: false, message: 'Unable to upload file' });
//       }
//     } else {
//       if (!req.file) {
//         res.json({ success: false, message: 'No file was selected' });
//       } else {
//         res.json({ success: true, message: 'File uploaded!' });
//       }
//     }
//   });
// });



const upload = multer({
  dest: '../uploads/images/',
  limits: { fileSize: 10000000, files: 1 },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return callback(new Error('Only Images are allowed !'), false)
    }
    callback(null, true);
  }
}).single('image')

router.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.status(400).json({ message: err.message })
    } else {
      let path = `../uploads/images/${req.file.filename}`
      res.status(200).json({ message: 'Image Uploaded Successfully !', img: path })
    }
  })
})

module.exports = router;