/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
module.exports = {
  login: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');
    var userType = req.param('userType');
    var deviceType = req.param('deviceType');
    var deviceToken = req.param('deviceToken');

    if (!email || !password || !userType || !deviceType || !deviceToken) {
      return res.json({ status: 401, message: 'email, password, userType, deviceType and deviceToken required' });
    }

    Users.findOne({ email: email }, function (err, user) {
      if (!user) {
        return res.json({ status: 401, message: 'email or password incorrect' });
      }

      Users.comparePassword(password, user, function (err, valid) {
        if (err) {
          return res.json({ status: 403, message: 'forbidden' });
        }

        if (!valid) {
          return res.json({ status: 401, message: 'email or password incorrect' });
        } else {

          user.deviceToken = deviceToken;
          user.deviceType = deviceType;
          user.save(function (err) {
            if (err) {
              return res.send(err);
            }
            else {

              localStorage.setItem('deviceToken', user.deviceToken);
              user.token = jwToken.issue({ id: user.id });
              res.json({
                status: 200,
                data: user,
                message: 'Logged In Successfully'
              });
            }
          });
        }
      });
    })
  },

  logout: function (req, res) {
    req.session.userId = null;
    req.session.authenticated = false;
    // req.session.destroy(function(err) {
    //   setTimeout(function(){
    //          return res.redirect('/');
    //      }, 1000);
    // });
  },

  sendNotificationToUser: function (req, res) {

    var deviceToken = localStorage.getItem('deviceToken');
    var payload = [{
      'notification': {
        'title': 'Hello Cyndy',
        'body': 'welcome'
      },
      'data': {
        'styleId': '123456'
      }
    }];
    Notification.findOne({ email: 'aman@gmail.com' }).exec(function (err, data) {
      if (err) {
        return res.send(err);
      }
      else if (!data) {
        Notification.create({ email: 'aman@gmail.com', deviceToken: deviceToken, notifications: payload }).exec(function (err, result) {
          if (err) {
            return res.send(err);
          }
          return res.send(result);
        })
      }
      else {
        var a = data.notifications;
        a.push(payload[0]);
        data.notifications = a;
        // data.push(payload);
        data.save(function (err) {
          if (err) {
            return res.send(err);
          }
          else {
            return res.send('success');
          }
        })
      }


    })
    // notificationService.sendNotification(deviceToken, payload);
    // return res.send('sent');
  },

};