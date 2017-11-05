const path = require('path');
const FirebaseServer = require('firebase-server');
const detect = require('detect-port');

const firebaseFactory = function (config) {
  return function (request, response, next) {
    const port = config.port || 5000;
    const data = config.data || {};

    detect(port)
      .then((detectedPort) => {
        if (detectedPort === port) {
          new FirebaseServer(port, '127.0.0.1', data);
        }

        next();
      });
  };
};

firebaseFactory.$inject = ['config.firebase'];

module.exports = {
  'middleware:firebase': ['factory', firebaseFactory],
};
