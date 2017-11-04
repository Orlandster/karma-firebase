module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'src/*.js',
      'test/src/*.js',
    ],

    browsers: process.env.TRAVIS ? ['Firefox'] : ['Chrome'],

    autoWatch: true,

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
    ],
  });
};