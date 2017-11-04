
const path = require('path');

const createPattern = function (pattern) {
  return { pattern, included: true, served: true, watched: false };
};

const initFirebase = function (files) {
  files.unshift(createPattern(path.join(__dirname, '/adapter.js')));
};

initFirebase.$inject = ['config.files'];

module.exports = {
  'framework:firebase': ['factory', initFirebase],
};
