module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'scripts/src/*.js', 'scripts/src/**/*.js'],
            options: {
                globals: {
                    console: true,
                    document: true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'scripts/src',
                    name: 'init',
                    out: 'scripts/build/intermediate.js',
                    optimize: 'none',
                    wrapShim: true,
                    inlineText: true
                }
            }
        },
        'regex-replace': {
            compile: {
                src: ['<%= requirejs.compile.options.out %>'],
                actions: [
                    {
                        name: 'definition-start',
                        search: new RegExp(
                            /define\('(.+?)',\[.*?\], *function \((.*?)\) \{/g),
                        replace: 'var $1 = (function ($2) {',
                    },
                    {
                        name: 'definition-end',
                        search: new RegExp(/^\}\);$/mg),
                        replace: '})();',
                    },
                ]
            }
        },
        concat: {
            options: {
                separator: '',
            },
            compile: {
                src: [
                    'scripts/build/wrap-start.js',
                    '<%= requirejs.compile.options.out %>',
                    'scripts/build/wrap-end.js'
                ],
                dest: 'scripts/build/skinmenu.js',
            },
        },
        less: {
            compile: {
                options: {
                    paths: ['styles/src']
                },
                files: {
                    'styles/build/base.css': 'styles/src/base.less',
                    'styles/build/theme.basic.css': 'styles/src/theme.basic.less'
                }
            }
        },
        watch: {
            js: {
                files: ['<%= jshint.files %>', 'scripts/build/wrap-*.js'],
                tasks: ['scripts']
            },
            less: {
                files: ['styles/src/*.less', 'styles/lib/*.less'],
                tasks: ['styles']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-regex-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('scripts', ['jshint', 'requirejs', 'regex-replace',
        'concat']);
    grunt.registerTask('styles', ['less']);
    grunt.registerTask('default', ['scripts', 'styles']);

};