const path = require('path');
const FirebaseServer = require('firebase-server');
const detect = require('detect-port');

const firebaseFactory = function (config) {
  return function (request, response, next) {
    detect(5000)
      .then((port) => {
        if (port === 5000) {
          const data = config.data || {};
          new FirebaseServer(5000, '127.0.0.1', data);
        }

        next();
      });
    }
};

firebaseFactory.$inject = ['config.firebase'];

module.exports = {
  'middleware:firebase': ['factory', firebaseFactory],
};
