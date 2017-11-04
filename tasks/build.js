module.exports = function (grunt) {
  /**
     * Build given file - wrap it with a function call
     * TODO(vojta): compile with uglify-js
     */
  grunt.registerMultiTask('build', 'Wrap given file into a function call.', function () {
    const src = grunt.file.expand(this.data).pop();
    const dest = src.replace('src/', 'lib/');
    const wrapper = src.replace('.js', '.wrapper');

    grunt.file.copy(wrapper, dest, { process(content) {
      const wrappers = content.split(/%CONTENT%\r?\n/);
      return wrappers[0] + grunt.file.read(src) + wrappers[1];
    } });

    grunt.log.ok(`Created ${dest}`);
  });
};
