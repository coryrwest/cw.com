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
        },
        postcss: {
            options: {
              map: true, // inline sourcemaps
              processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                require('cssnano')() // minify the result
              ]
            },
            dist: {
              src: 'docs/styles/*.css'
            }
        },
        uncss: {
            dist: {
                options: {
                    report: 'min'
                },
                files: {
                    'docs/styles/compiled.min.css': ['docs/*.html']
                }
            }
        },
        processhtml: {
          dist: {
            files: { 'docs/index.html': ['docs/index.html'] }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('default', ['jshint', 'sass', 'jade', 'copy', 'postcss', 'uncss', 'processhtml']);
};