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
                src: [".sass-cache", "public/css", "public/js", "public/img"]
            },
            release: {
                src: ["public/css/*.map"]
            }
        },

        'dart-sass': {
            target: {
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
                dest: '01_dev/css/'
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
            css: {
                files: [
                    {
                        expand: true,
                        cwd: '01_dev/css',
                        src: '*',
                        dest: 'public/css'
                    }
                ],
            },
            img: {
                files: [
                    {
                        expand: true,
                        cwd: '01_dev/img',
                        src: ['*'],
                        dest: 'public/img'
                    }
                ],
            }
        },

        processhtml: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '01_dev/template/',
                    src: ['*.html'],
                    dest: 'public/',
                    ext: '.html'
                }],
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: '01_dev/template/',
                    src: ['*.html'],
                    dest: 'public/',
                    ext: '.html'
                }],
            }
        },

        cacheBust: {
            taskName: {
                options: {
                    assets: ['public/css/*', 'public/js/*', 'public/img/*'],
                    baseDir: './',
                    deleteOriginals: true,
                    createCopies: true,
                },
                src: ['public/index.html', 'public/404.html', 'public/privacy-policy.html', 'public/cookie-policy.html', 'public/experiences-and-sights.html', 'public/restaurants.html', 'public/about-vienna.html', 'public/coffee-places.html', 'public/menu.html']
            }
        },


        'sw-precache': {
            options: {
                cacheId: 'nmSW',
                workerFileName: 'sw.js',
                verbose: true,
                baseDir: './public',
            },
            'default': {
                staticFileGlobs: [
                    'css/*.css',
                    'img/*.{gif,png,jpg}',
                    'js/*.js',
                    '*.html',
                ],
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
                tasks: ['dart-sass'],
            },
            css: {
                files: '01_dev/css/**/*',
                tasks: ['autoprefixer', 'copy:css'],
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

    grunt.loadNpmTasks('grunt-dart-sass');
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
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-sw-precache');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['connect', 'clean:build', 'dart-sass', 'autoprefixer', 'copy:css', 'jshint', 'copy:js', 'copy:img', 'processhtml:dev', 'watch']);
    grunt.registerTask('prod', ['clean:build', 'dart-sass', 'autoprefixer', 'copy:css', 'cssmin', 'copy:js', 'uglify', 'copy:img', 'processhtml:prod', 'cacheBust', 'htmlmin', 'clean:release', 'sw-precache']);
    grunt.registerTask('checkjs', ['jshint']);
};
