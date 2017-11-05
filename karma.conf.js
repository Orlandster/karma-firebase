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
          const port = config.firebase.port || 5000;
          
          return function (request, response, next) {
            detect(port)
              .then((activePort) => {
                if (activePort === port) {
                  new firebaseServer(port, '127.0.0.1', config.firebase.data);
                }
      
                next();
              });
          };
        }]
      }
    ],

    firebase: {
      port: 5000,
      data: { init: true },
    },

    beforeMiddleware: ['firebase'],
  });
};