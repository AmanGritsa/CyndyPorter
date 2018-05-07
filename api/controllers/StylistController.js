/**
 * StylistController
 *
 * @description :: Server-side logic for managing stylists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getStylistList: function (req, res) {
        Stylist.find().exec(function (err, data) {
            if (err) {
                return res.send(err);
            }
            return res.send({ status: 200, data: data, messge: 'Stylist List Fetched Successfully' });
        })
    },

    addStylist: function (req, res) {
        if (!req.body.email || !req.body.name || !req.body.phoneNumber || !req.body.userType) {
            return res.send({ status: 401, message: 'Please provide user type, name, email and phone number' });
        }
        else {
            if (req.body.userType == 'admin') {
                Stylist.findOne({ email: req.body.email }).exec(function (err, result) {
                    if (err) {
                        return res.send({ status: err.status, data: err, message: 'Stylist registration failed' });
                    }
                    else if (!result) {
                        Stylist.create(req.body).exec(function (err, data) {
                            if (err) {
                                return res.send({ status: err.status, data: err, message: 'Stylist registration failed' });
                            }
                            return res.send({ status: 200, data: data, message: 'Stylist added successfully' });
                        });
                    }
                    else {
                        return res.send({ status: 401, message: 'Stylist already registered with this email please try with another email' });
                    }
                })
            }
            else {
                return res.send({ status: 401, message: 'You are not authorised to add stylist' });
            }
        }
    },

    deleteStylist: function (req, res) {
        var email = req.body.email;
        var userType = req.body.userType;
        if (!email || !userType) {
            return res.send({ status: 401, message: 'Please provide userType and email of stylist' });
        }
        if (userType == 'admin') {
            Stylist.destroy({ email: email }).exec(function (err, data) {
                if (err) {
                    return res.send({ status: err.status, data: err, message: 'Stylist registration failed' });
                }
                else if (data.length == 0) {
                    return res.send({ status: 401, message: "Stylist doesn't exist" });
                }
                return res.send({ status: 200, message: 'Stylist successfully deleted' });

            })
        }
        else {
            return res.send({ status: 401, message: 'You are not authorised to delete stylist' });
        }
    }
};