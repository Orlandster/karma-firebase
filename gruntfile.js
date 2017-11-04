const path = require('path');

module.exports = function (grunt) {

  grunt.initConfig({
    pkgFile: 'package.json',
    karma: {
      adapter: {
        configFile: 'karma.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: ['dots'],
      },
    },
    eslint: {
      target: [
        'src/adapter.js',
        'lib/index.js',
        'gruntfile.js',
        'karma.conf.js',
        'test/*.js',
        'tasks/*.js',
      ],
    },
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['karma']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('default', ['eslint', 'karma']);
};
