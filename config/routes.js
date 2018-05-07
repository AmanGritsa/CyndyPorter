/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/api': {
    view: 'homepage'
  },
  'POST /api/signup': 'UsersController.signup',
  'POST /api/login': 'AuthController.login',
  'POST /api/getAllUsers': 'UsersController.getAllUsers',
  'POST /api/getUserProfile': 'UsersController.getUserProfile',
  'GET /api/getStylistList': 'StylistController.getStylistList',
  'POST /api/addStylist': 'StylistController.addStylist',
  'POST /api/uploadUserImage': 'GalleryController.uploadUserImage',
  'POST /api/sendPasswordResetLink': 'UsersController.sendPasswordResetLink',
  'GET /api/resetPassword/:token': { view: 'changePassword' },
  'POST /api/resetPassword/:token': 'UsersController.resetPassword',
  '/api/services': {
    view: 'apiDocument'
  },
  'POST /api/logout': 'AuthController.logout',
  'POST /api/getCompleteRequest': 'UsersController.getCompleteRequest',
  'POST /api/getPendingRequest': 'UsersController.getPendingRequest',
  'POST /api/updateImageDetails': 'GalleryController.updateImageDetails',
  'POST /api/sendDetailsInPDF': 'UsersController.sendDetailsInPDF',
  'GET /api/sendNotificationToUser': 'AuthController.sendNotificationToUser',
  'POST /api/getAllNotifications': 'UsersController.getAllNotifications',
  'POST /api/getUserStyle': 'GalleryController.getUserStyle',
  'POST /api/getLatestUserStyle': 'GalleryController.getLatestUserStyle',
  'POST /api/getStyleListById': 'GalleryController.getStyleListById',
  'DELETE /api/deleteStylist': 'StylistController.deleteStylist',
  'DELETE /api/deleteRequest': 'GalleryController.deleteRequest',
  'POST /api/downloadDetailsInPdf': 'UsersController.downloadDetailsInPdf',
  'POST /api/sendMessageToUser': 'GalleryController.sendMessageToUser',
  'GET /api/terms&conditions': { view: 'termsAndConditions' },
  'GET /api/privacyPolicy': { view: 'privacyPolicy' }

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
