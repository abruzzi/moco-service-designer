module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodewebkit: {
            options: {
                platforms: ['osx'],
                buildDir: 'builds',
            },
            src: ['public/**/*']
        },

    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.registerTask('default', ['nodewebkit']);
};
