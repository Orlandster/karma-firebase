const firebaseServer = require('firebase-server');
const detect = require('detect-port');

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'test/test.bundle.js',
    ],

    browsers: process.env.TRAVIS ? ['Firefox'] : ['Chrome'],

    autoWatch: true,

    plugins: [
      'karma-*',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      { 
        'middleware:firebase': ['factory', function (config) {
          return function (request, response, next) {
            detect(5000)
              .then((port) => {
                if (port === 5000) {
                  new firebaseServer(5000, '127.0.0.1', { init: true });
                }
      
                next();
              });
          };
        }]
      }
    ],

    beforeMiddleware: ['firebase'],
  });
};