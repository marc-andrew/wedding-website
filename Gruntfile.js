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
                src: [".sass-cache", "public/css/style.css.map"]
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
                dest: 'public/css/'
            },
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'public/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'public/css/',
                ext: '.css'
            }
        },

        jshint: {
            all: ['01_dev/js/script.js'],
            options: {
                'esversion': 6,
            }
        },

        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'public/js/',
                    src: ['**/*.js', '!**/*.min.js', '!*.min.js', '!lib/*.js'],
                    dest: 'public/js',
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
                    cwd: 'public/',
                    src: ['*.html'],
                    dest: 'public/'
                }]
            }
        },

        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: '01_dev/js',
                        src: ['*.js'],
                        dest: 'public/js'
                    }
                ],
            },
            cssmap: {
                files: [
                    {
                        expand: true,
                        cwd: '01_dev/css',
                        src: '*.css.map',
                        dest: 'public/css'
                    }
                ],
            }
        },

        processhtml: {
            prod: {
                files: {
                    'public/index.html': ['01_dev/template/index.html'],
                    'public/404.html': ['01_dev/template/404.html'],
                }
            },
            dev: {
                files: {
                    'public/index.html': ['01_dev/template/index.html'],
                    'public/404.html': ['01_dev/template/404.html'],
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'public/',
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
                tasks: ['processhtml:dev'],
                options: {
                    livereload: true,
                }
            }
        } // end watch
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['connect', 'sass', 'autoprefixer', 'copy:cssmap', 'jshint', 'copy:js', 'processhtml:dev', 'clean:build', 'watch']);
    grunt.registerTask('prod', ['sass', 'autoprefixer', 'copy:js', 'uglify', 'cssmin', 'processhtml:prod', 'htmlmin']);
    grunt.registerTask('checkjs', ['jshint']);
};
