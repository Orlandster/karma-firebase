module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'test/test.bundle.js',
    ],

    browsers: ['Chrome'],

    autoWatch: false,

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      'karma-firebase',
    ],

    firebase: {
      data: {
        init: true,
      },
    },

    beforeMiddleware: ['firebase'],
  });
};
