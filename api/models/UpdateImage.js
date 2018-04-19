/**
 * UpdateImage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,
    attributes: {

        //   imageId: {
        //     type: 'string',
        //     required: true
        //   },
        //   email: {
        //     type: 'email',
        //     required: true
        //   },
        //   imageUrl: {

        //   }
        image: {
            required: true
        },
        colors: {
            required: true
        },
        isUpdated: {
            type: 'integer',
            required: true,
            defaultsTo: 0
        }
    }
};

