var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var nodemailer = require('nodemailer');
const multer = require("multer");
var fs = require('fs');
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('lodash');

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});

// aici se face adaugarea in baza de date cu toate campurile
async function addToDB(req, res) {
  var user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    verify: req.body.verify,
    gender: req.body.gender,
    bio: req.body.bio,
    location: req.body.location,
    hobby: req.body.hobby,
    profilePicture: req.body.profilePicture,
    twitterName: req.body.twitterName,
    githubName: req.body.githubName,
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

// router.post('/edit', function (req, res, next) {
//   addToDBpersonalInfo(req, res);
// });

// async function addToDBpersonalInfo(req, res) {
//   var user = new User({
//     img: req.body.img,
//     gender: req.body.gender,
//     bio: req.body.bio,
//     location: req.body.location,
//     hobby: req.body.hobby,
//   });

//   try {
//     doc = await user.save();
//     return res.status(201).json(doc);
//   }
//   catch (err) {
//     return res.status(501).json(err);
//   }
// }

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

router.get('/profile', function (req, res, next) {
  return res.status(200).json(req.user);
});

router.get('/logout', function (req, res, next) {
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

// update user info
router.put('/:id', function (req, res, next) {
  // fetch user
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);

    _.assign(post, req.body); // update user
    post.save(function (err) {
      if (err) return next(err);
      return res.json(200, post);
    })
  });
});

// router.put('/:id', function (req, res, next) {
//   User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) {
//       console.log('Error in user update: ' + JSON.stringify(err, undefined, 2));
//       return next(err);
//     }
//     res.json(post);
//   });
// });

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  }
  User.findById(req.params.id, (err, docs) => {
    if (!err) {
      console.log(docs)
      res.send(docs);
    } else {
      console.log('Error in retriving user: ' + JSON.stringify(err, undefined, 2));
    }
  });
});

// delete account
router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  }
  User.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in user delete: ' + JSON.stringify(err, undefined, 2));
    }
  });
});

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

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../uploads/images/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  // reject file
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

const upload = multer({
  storage: storage, limits: {
    fileSize: 1024 * 1042 * 5 // 5mb
  },
  fileFilter: fileFilter
});

router.post('/upload', upload.single('profilePicture'), (req, res) => {
  // console.log(req.file);
  addProfilePic(req, res);
})

async function addProfilePic(req, res) {
  var user = new User({
    profilePicture: req.file.path
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

module.exports = router;