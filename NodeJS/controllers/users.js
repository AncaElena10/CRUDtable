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

async function addToDB(req, res) {
  var user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    verify: req.body.verify,
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

router.get('/profile', function (req, res, next) {
  return res.status(200).json(req.user);
});

router.get('/logout', function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: 'Logout Success' });
})

router.put('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);

    _.assign(post, req.body);
    post.save(function (err) {
      if (err) return next(err);
      return res.json({ success: true, message: 'Record successfully updated!' })
    })
  });
});

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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/images');
  },
  filename: function (req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      var err = new Error();
      err.code = 'filetype';
      return cb(err);
    } else {
      cb(null, file.originalname);
    }
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }
}).single('profilePicture');

router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    User.update(
      {
        _id: req.body._id
      },
      {
        profilePicture: fs.readFileSync(req.file.path)
      }, (err) => {
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
          } else if (err.code === 'filetype') {
            res.json({ success: false, message: 'Filetype is invalid. Must be .png, .jpg or .jpeg' });
          } else {
            res.json({ success: false, message: 'Unable to upload file' });
          }
        } else {
          if (!req.file) {
            res.json({ success: false, message: 'No file was selected' });
          } else {
            res.json({ success: true, message: 'File uploaded!' });
          }
        }
      }
    );
  });
});

router.post("/send", (req, res) => {
  console.log(req.body)
  const output = `
    <p>You have a new contact req</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.nameSender}</li>
      <li>Email: ${req.body.emailSender}</li>
      <li>Phone: ${req.body.phoneSender}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.messageSender}</p>
  `;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'potatotest10@gmail.com',
      pass: 'password;'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: '"Nodemailer Contact" <potatotest10@gmail.com>',
    to: "ancaem10@gmail.com",
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
})

module.exports = router;
