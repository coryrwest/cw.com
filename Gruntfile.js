module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['src/js']
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'build/styles/main.css': 'src/styles/main.scss',
                    'build/styles/normalize.css': 'src/styles/normalize.scss'
                }
            }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    },
                    pretty: true
                },
                files: [{
                    cwd: "src",
                    src: "*.jade",
                    dest: "build/",
                    expand: true,
                    ext: ".html"
                }]
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/img', src: ['**'], dest: 'build/img/', filter: 'isFile' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint', 'sass', 'jade', 'copy']);
};