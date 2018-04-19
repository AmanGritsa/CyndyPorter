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

    },

    upload: function (req, res) {
        //     req.file('image').upload({
        //         dirname: 'www.google.com/'
        //     }, function (error, uploadedFiles) {
        //         // do something after file was uploaded...
        //         if (error) {
        //             return res.send(error);
        //         }
        //         return res.send(uploadedFiles);
        //     });
        // },

        // save original file name
        // var origifile = req.file('testfile')._files[0].stream.filename;
        // var tempName = origifile;

        // testing
        var randomNumber = Math.floor(Math.random() * 9999999);
        var tempName = randomNumber + ".jpg";

        var tempDir = 'assets/images';
        req.file('testfile').upload(tempName, function (error, files) {
            // do something after file was uploaded...
            if (error) {
                return res.send(error);
            }
            var json = {
                'imageUrl': tempDir + '/' + tempName,
                'type': files[0].type,
                'size': files[0].size
            };

            files[0].filename = tempName;
            return res.send(json);
        });
    }
};