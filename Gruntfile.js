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
                    'docs/styles/main.css': 'src/styles/main.scss',
                    'docs/styles/normalize.css': 'src/styles/normalize.scss',
                    'docs/styles/font-awesome.css': 'src/styles/font-awesome.scss'
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
                    dest: "docs/",
                    expand: true,
                    ext: ".html"
                }]
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/img', src: ['**'], dest: 'docs/img/', filter: 'isFile' },
                    { expand: true, cwd: 'src/font', src: ['**'], dest: 'docs/font/', filter: 'isFile' }
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