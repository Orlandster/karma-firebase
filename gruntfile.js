const path = require('path');

module.exports = function (grunt) {

  grunt.initConfig({
    pkgFile: 'package.json',
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: ['dots'],
      },
    },
    eslint: {
      target: [
        'karma.conf.js',
        'test/index.spec.js',
        'index.js',
      ],
    },
    webpack: {
      prod: {
        entry: './test/index.spec.js',
        output: {
          path: path.resolve(__dirname, 'test'),
          filename: 'test.bundle.js',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-webpack');

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['webpack', 'karma']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('default', ['eslint', 'karma']);
};
