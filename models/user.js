var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  role: {type: String,
        trim: true
  },
  password: {
    type: String,
    required: true,
  }
});
/*
UserSchema.statics.listUsers = function(User) {
  return function (req, res) {
    console.log('Finding users');
    User.find({}, function(error, users) {
     if (error) {
       var error = new Error('Problem getting users');
       err.status = 401;
       next(err);
     }

     console.log('No error, rendering page');

     res.render('users/listusers', {users : users});
    });
  }
};
*/
UserSchema.statics.listUsers = function(callback) {
  console.log('Finding users');
  User.find({}).
    exec(function(error, users) {
     if (error) {
       return callback(error);
     }

     return callback(null, users);
  });
};

UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
    });
};

UserSchema.pre('save', function (next) {
  var user = this;
  console.log('Presave the user to hash the password');
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  })
});

/*
console.log('Presave the user to hash the password');
bcrypt.hash(user.password, 10, function (err, hash) {
  if (err) {
    return next(err);
  }

  user.password = hash;
  next();
})
*/

var User = mongoose.model('User', UserSchema);
module.exports = User;
