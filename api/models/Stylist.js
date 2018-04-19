/**
 * Stylist.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  
  attributes: {

    // stylistId: {
    //  type: 'number',
    //   required: 'true',
    //   autoIncrement: true
    // },
    name: {
      type: 'string',
      required: true,
    },
    addedBy: {
      type: 'email',
      required: true
    }
  }
};

