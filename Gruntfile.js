module.exports = function(grunt){
    var mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        /**
         * 01
         */
        uglify: {
          my_target: {
            files: {
                'dist/js/scripts.min.js': ['js/alumno.js']
            }
          } //my_target
        }, //uglify
        /**
         * 02
         */
        watch: {
            scripts: {
                files: ['js/alumno.js'], // archivos vigilados
                tasks: ['uglify'],
                options: {
                  spawn: false,
                }
            }
        }, //watch
        imagemin: {
            main: {
                options: {  // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif,.svg}'],
                    dest: 'dist/img/'
              }]
            }
        }, //imagemin
        less: {
          development: {
            options: {
              paths: ["assets/css"]
            },
            files: {
              "dist/css/development.css": "less/less.less"
            }
          },
          production: {
            options: {
              paths: ["assets/css"],
              cleancss: true,
              modifyVars: {
                imgPath: '"http://mycdn.com/path/to/images"',
                bgColor: 'red'
              }
            },
            files: {
              "dist/css/production.css": "less/less.less"
            }
          }
        },

        // inside Gruntfile.js
        // Using the BrowserSync Server for your static .html files.
        browserSync: {
          default_options: {
            bsFiles: {
              src: [
                //"css/*.css",
                "*.html"
              ]
            },
            options: {
              watchTask: true,
              debugInfo: true,
              server: {
                //baseDir: "./"                
                baseDir: "/var/www/html/mygrunt",
                index: "text.html"                
              }
            }
          }
        }


    });

    // 01 : uglify : command shell [uglify my_target]
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 02 : watch : command shell [grunt watch]
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 03 : imagemin : command shell [grunt imagemin]
    // 03.1: imagemin-mozjpeg
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    // register a default task.
    grunt.registerTask('default', ['imagemin','browserSync', 'watch']);    
    // 04 : less : command shell [grunt less]
    grunt.loadNpmTasks('grunt-contrib-less');
    // 05 : browser-sync : command shell [(1)grunt browserSync (2)grunt]
    grunt.loadNpmTasks('grunt-browser-sync');

};