// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js', 'js/src/**/*.js']
        },
        // configure uglify to minify js files -------------------------------------
        uglify: 
        {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
              files: {
                  'js/live/scripts-min.js': 'js/src/scripts.js'
              }
            }
        },
      
        // compile less stylesheets to css -----------------------------------------
        less: {
          build: {
            files: {
              'css/src/style.css': 'css/src/style.less'
            }
          }
        },
      
        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
          },
          build: {
                files: {
                    'css/live/style-min.css': 'css/src/style.css'
                }
            }
        },
        // configure watch to auto update ----------------
        watch: {

            // for stylesheets, watch css and less files 
            // only run less and cssmin stylesheets: { 
            files: ['css/src//*.css', 'css/src//*.less'], 
            tasks: ['default'],

            // for scripts, run jshint and uglify 
            scripts: { 
                files: 'js/src/*.js', tasks: ['jshint', 'uglify'] 
            } 
        }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
    
    // ============= // CREATE TASKS ========== //
  grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin']); 

};