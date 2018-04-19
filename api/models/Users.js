/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 // We don't want to store password with out encryption
var bcrypt = require('bcrypt');
module.exports = {

  schema: true,
  
  attributes: {
    email: {
      type: 'email',
      required: 'true',
      unique: true,
      maxLength: 255
    },

    password: {
      type: 'string',
      required: 'true',
      maxLength: 255
    },

    userName: {
      type: 'string',
      required: 'true',
      maxLength: 255
    },
    phoneNumber: {
      type: 'string',
      required: 'true',
      maxLength: 255
    },
    stylistName: {
      type: 'string',
      required: 'true',
      maxLength: 255
    },
    stylistId: {
      type: 'string',
      required: true,
      maxLength: 255
    },
    userType: {
      type: 'string',
      defaultsTo: 'user',
      required: 'true',
      maxLength: 255
    },
    deviceType: {
      type: 'string',
      maxLength: 255
    },
    deviceToken: {
      type: 'string',
      maxLength: 255
    },
    resetPasswordToken: {
      type: 'string',
      defaultsTo: null
    },
    resetPasswordExpires: {
      type: 'integer',
      maxLength: 255,
      defaultsTo: null
    },
    // We don't wan't to send back encrypted password either
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  // Here we encrypt password before creating a User
  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.password = hash;
        next();
      })
    })
  },

  comparePassword : function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};

