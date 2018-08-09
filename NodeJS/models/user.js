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
  img: { data: Buffer, contentType: String },
  // img: { type: String, required: false },
  // picture: { type: Schema.Types.Mixed, required: true },
  // gender: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
});

schema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

schema.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
}

schema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    user.verify = hash;
    next();
  });
});

schema.pre('save', function (next) {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('User', schema);