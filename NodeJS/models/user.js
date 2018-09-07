var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verify: { type: String, required: true },
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

schema.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
}

schema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.verify = hash
      next();
    });
  });
});

module.exports = mongoose.model('User', schema);