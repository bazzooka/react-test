module.exports = function(grunt) {

    grunt.initConfig({
        react: {
            files: {
                expand: true,
                cwd: './',
                src: ['jsx/**/*.jsx'],
                dest: './build/',
                ext: '.js'
            }
        },
        watch : {
            scripts: {
                files: ['jsx/**/*.jsx'],
                tasks: ['react'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};