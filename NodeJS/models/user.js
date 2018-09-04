// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');

// var schema = new Schema({
//   firstname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   verify: { type: String, required: true }
// });

// schema.statics.hashPassword = function hashPassword(password) {
//   return bcrypt.hashSync(password, 10);
// }

// schema.methods.isValid = function (hashedpassword) {
//   return bcrypt.compareSync(hashedpassword, this.password);
// }

// schema.statics.authenticate = function (email, password, callback) {
//   User.findOne({ email: email })
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }

// schema.pre('save', function (next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     user.verify = hash;
//     next();
//   });
// });

// module.exports = mongoose.model('User', schema);


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verify: { type: String, required: true },
  // profilePicture: { type: String, required: false },
  profilePicture: { data: Buffer, contentType: String, required: false },
  gender: { type: String, required: false },
  bio: { type: String, required: false },
  location: { type: String, required: false },
  hobby: { type: String, required: false },
  twitterName: { type: String, required: false },
  githubName: { type: String, required: false },
  facebookName: { type: String, required: false },
  youtubeName: { type: String, required: false },
  birthday: { type: Date, required: false },
  publicBirthday: { type: Boolean, required: false },
  phoneNumber: { type: Number, required: false },
});

// schema.statics.hashPassword = function hashPassword(password) {
//   return bcrypt.hashSync(password, 10);
// }

schema.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
}

schema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      user.verify = hash
      next();
    });
  });
});

// schema.methods.changeDate = function changeDate(dateString) {
//   dateString = new Date(dateString).toUTCString();
//   dateString = dateString.split("T").slice(0, 4).join(' ');
//   console.log(dateString);
// }

// schema.pre('save', function (next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     user.verify = hash;
//     next();
//   });
// });

module.exports = mongoose.model('User', schema);