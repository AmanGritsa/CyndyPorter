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

        if (!req.body.userType) {
            return res.send({ status: 401, message: 'Please provide user type' });
        }
        else {
            if (req.body.userType == 'admin') {
                Stylist.create(req.body).exec(function (err, data) {
                    if (err) {
                        return res.send({ status: err.status, data: err, message: 'Stylist registration failed' });
                    }
                    return res.send({ status: 200, data: data, message: 'Stylist added successfully' });
                });
            }
            else {
                return res.send({ status: 401, message: 'You are not authorised to add stylist' });
            }
        }
    },
};