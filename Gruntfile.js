'use strict';
var path = require('path');

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: [".sass-cache"]
            },
            release: {
                src: [".sass-cache", "02_production/css/style.css.map"]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'auto',
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '01_dev/sass/',
                        src: ['**/*.scss'],
                        dest: '01_dev/css/',
                        ext: '.css'
                    }
                ]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: '01_dev/css/*.css',
                dest: '02_production/css/'
            },
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: '02_production/css/',
                src: ['*.css', '!*.min.css'],
                dest: '02_production/css/',
                ext: '.css'
            }
        },

        jshint: {
            all: ['01_dev/js/**/*.js']
        },

        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: '02_production/js/',
                    src: ['**/*.js', '!**/*.min.js', '!*.min.js', '!lib/*.js'],
                    dest: '02_production/js',
                    ext: '.js'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '02_production/',
                    src: ['*.html'],
                    dest: '02_production/'
                }]
            }
        },

        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: '01_dev/js',
                        src: '**',
                        dest: '02_production/js'
                    }
                ],
            },
            cssmap: {
                files: [
                    {
                        expand: true,
                        cwd: '01_dev/css',
                        src: '*.css.map',
                        dest: '02_production/css'
                    }
                ],
            }
        },

        replace: {
            html: {
                src: ['02_production/*.html'],
                overwrite: true,
                replacements: [{
                    from: '<script src="//localhost:35729/livereload.js"></script>',
                    to: ''
                }]
            }
        },

        processhtml: {
            dist: {
                files: {
                    '02_production/index.html': ['01_dev/template/index.html'],
                }
            },
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '02_production/',
                    hostname: '*'
                }
            }
        },

        watch: {
            options: {
                dateFormat: function (time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                    grunt.log.writeln('Waiting for new changes ...');
                },
            },
            sass: {
                files: '01_dev/sass/**/*',
                tasks: ['sass', 'copy:cssmap'],
            },
            css: {
                files: '01_dev/css/**/*',
                tasks: ['autoprefixer'],
                options: {
                    livereload: true,
                }
            },
            js: {
                files: '01_dev/js/**/*',
                tasks: ['jshint', 'copy:js'],
                options: {
                    livereload: true,
                }
            },
            html: {
                files: '01_dev/template/**/*',
                tasks: ['processhtml'],
                options: {
                    livereload: true,
                }
            }
        } // end watch
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['connect', 'sass', 'autoprefixer', 'copy:cssmap', 'jshint', 'copy:js', 'processhtml', 'clean:build', 'watch']);
    grunt.registerTask('prod', ['sass', 'autoprefixer', 'copy:js', 'uglify', 'cssmin', 'processhtml', 'replace', 'htmlmin', 'clean:release', 'watch']);
    grunt.registerTask('checkjs', ['jshint']);
};
