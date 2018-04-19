/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt')
var ejs = require('ejs')
var pdf = require('html-pdf')
module.exports = {
    signup: function (req, res) {
        Users.findOne({ email: req.body.email }).exec(function (err, data) {
            if (err) {
                return res.json({ status: err.status, data: err, message: 'Signup Failed' });
            }
            else if (data) {
                return res.json({ status: 401, message: 'Email already exist!' });
            }
            else {
                Users.create(req.body).exec(function (err, user) {
                    if (err) {
                        return res.json({ status: err.status, data: err, message: 'Signup Failed' });
                    }
                    // If user created successfuly we return user as response
                    if (user) {
                        user.token = jwToken.issue({ id: user.id });
                        res.json({ status: 200, data: user, message: 'Signup Successfully' });
                    }
                });
            }

        });
    },

    getAllUsers: function (req, res) {
        Users.find().exec(function (err, users) {
            if (err) {
                return res.send({ status: err.status, data: err, message: 'User List Not Fetched' });
            }
            return res.send({ status: 200, data: users, message: 'User List Fetched Successfully' });
        })
    },

    getUserProfile: function (req, res) {
        var email = req.param('email');
        if (!req.body.email) {
            return res.send({ status: 401, message: 'email required' });
        }
        Users.findOne({ email: email }).exec(function (err, user) {
            if (err) {
                return res.send({ status: err.status, data: user, message: 'User List Not Fetched' });
            }
            else if (!user) {
                return res.send({ status: 401, message: 'User not found' });
            }
            return res.send({ status: 200, data: user, message: 'User Profile Fetched Successfully' });
        });
    },

    sendPasswordResetLink: function (req, res) {
        var email = req.param('email');
        var user = Users.findOne({ email: email }).exec(function (err, result) {

            try {
                if (err) {
                    return res.json(apiResponse.failure(err));
                } else {
                    if (result) {
                        var emailDetails = result;

                        emailDetails["email"] = req.body.email;
                        emailDetails["resetToken"] = jwToken.issue({ id: emailDetails.id });
                        emailService.sendResetPasswordToken(emailDetails);
                        result.resetPasswordToken = emailDetails.resetToken;
                        result.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        result.save(function (err) {
                            if (err) {
                                return res.send({ status: 400, data: err, message: "Password reset link can't be sent" });
                            }
                            else {
                                return res.json({ status: 200, message: 'Reset Password link has sent on your registered mail. Please check your mail' });
                            }
                        });


                    }
                    else {
                        return res.json({ status: 400, message: 'Email does not exist. Please enter the registered email' });
                    }

                }
            } catch (ex) {
                return res.end(ex.message);
            }
        });
    },

    resetPassword: function (req, res) {
        var token = req.param('token');
        var currentTime = Date.now();
        Users.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: currentTime
            }
        }).exec(function (err, user) {
            if (!err && user) {

                if (req.body.newPassword === req.body.confirmPassword) {
                    user.password = bcrypt.hashSync(req.body.newPassword, 10);
                    user.resetPasswordToken = null;
                    user.resetPasswordExpires = null;
                    user.save(function (err) {
                        if (err) {
                            return res.send(err);
                        }
                        else {
                            emailService.passwordResetConfirmation(user);
                            return res.send('Password successfully changed');
                        }
                    });
                }
                else {
                    return res.send("New Password and Confirm Password doesn't match");
                }
            }
            else {
                return res.send('Invalid token or link expired');
            }

        })
    },

    getUsersToManageImage: function (req, res) {

        var userType = req.param('userType');
        if (!userType) {
            return res.send({ status: 401, message: 'please provide user type' });
        }
        if (userType == 'admin') {
            Users.find({ userType: 'user' }).exec(function (err, users) {
                if (err) {
                    return res.send({ status: err.status, data: err, message: 'users not fetched' });
                }
                else {
                    var userList = [];
                    UpdateImage.find({ isUpdated: 0 }).exec(function (err, imageData) {

                        if (err) {
                            return res.send({ status: err.status, data: err, message: 'users not found' });
                        }
                        else {

                            imageData.filter(function (imageJson) {
                                users.filter(function (userJson) {
                                    if (imageJson.image.email == userJson.email) {

                                        function UsersList() {
                                            return {
                                                'id': userJson.id,
                                                'email': userJson.email,
                                                'userName': userJson.userName,
                                                'stylistName': userJson.stylistName,
                                                'phoneNumber': userJson.phoneNumber,
                                                'imageId': imageJson.image.id,
                                                'imageUrl': imageJson.image.imageUrl,
                                                'styleId': imageJson.id,
                                                'deviceToken': userJson.deviceToken,
                                                'deviceType': userJson.deviceType
                                            };
                                        };
                                        var s = UsersList();
                                        userList.push(s);
                                    }
                                });
                            });
                            return res.send({ status: 200, data: userList, message: 'Users Fetched Successfully' });
                        }
                    });
                }

            });
        }
        else {
            return res.send({ status: 401, message: 'You are not authorised' });
        }

    },

    sendPDF: function (req, res) {

        Gallery.findOne({ email: 'aman1@gmail.com' }).exec(function (err, user) {
            if (err) {
                return res.send(err);
            }
            else {
                var pdf = require('html-pdf');
                var variables = {
                    user: user
                };

                ejs.renderFile('./views/pdfFile.ejs', variables, function (err, result) {
                    // render on success
                    if (result) {
                        html = result;
                        pdf.create(html).toStream(function (err, stream) {
                            res.contentType("application/pdf");
                            var user1 = {
                                email: 'amanniet@gmail.com'
                            }
                            emailService.sendPDF(user1, stream);

                            // stream.pipe(fs.createWriteStream('./foo.pdf'));
                        });
                    }
                    // render or error
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });
            }
        })
    },

    getAllNotifications: function (req, res) {
        if (!req.body.email) {
            return res.send({ status: 401, message: 'Please provide an Email' });
        }
        else {
            Notification.findOne({ email: req.body.email }).exec(function (err, data) {
                if(err){
                    return res.send({status: 401, data: err, message: 'Notifications not fetched'});
                }
                return res.send({status: 200, data: data, message: 'Notification list fetched'});

            })
        }

    }

};