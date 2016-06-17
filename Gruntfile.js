 module.exports = function(grunt) {

["contrib-less", "contrib-watch", "contrib-copy", "contrib-cssmin", "contrib-uglify",
      "contrib-concat","includes", "http-server", "contrib-connect"].forEach(function(plugin) {
    grunt.loadNpmTasks("grunt-" + plugin);
  });

     grunt.registerTask("default", [ "connect", "copy", "less", "concat", "uglify",
       "cssmin", "includes", "watch"]);

   grunt.initConfig({
      less: {
       sb_admin: {
          files: {
             "dist/assets/stylesheets/sb-admin-2.css": "sources/less/sb-admin-2.less"
            }
         },
      },
      concat: {
         stylesheets: {
                     src: ["dist/assets/stylesheets/sb-admin-2.css",
                          "assets/bower/metisMenu/dist/metisMenu.min.css",
                          "sources/css/timeline.css",
                          "sources/css/sb-admin-2.css"],
                    dest: "dist/assets/stylesheets/sb-admin.css"
                 },
        javascripts:{
                    src: ["assets/bower/jquery/dist/jquery.min.js",
                          "assets/bower/bootstrap/dist/js/bootstrap.min.js",
                          "assets/bower/metisMenu/dist/metisMenu.min.js",
                          "assets/bower/raphael/raphael.min.js",
                          "assets/bower/morrisjs/morris.min.js",
                          "sources/javascripts/morris-data.js",
                          "sources/javascripts/sb-admin-2.js"],
                    dest: "dist/assets/javascripts/sb-admin.js"
                 }
              },
      uglify: {
        sb_admin: {
           files: {
             "dist/assets/javascripts/sb-admin.min.js": ["dist/assets/javascripts/sb-admin.js"]
            }
        }
     },
      // Copiando as bibliotecas de fonts que serão utilizadas no layout
      copy: {
         fonts: {
               expand: true,
               flatten: true,
               cwd: "assets/bower/",
               src: ["font-awesome/fonts/*", "bootstrap/fonts/*"],
               dest: "dist/assets/fonts/",
               filter: 'isFile',
           },
      },
     cssmin: {
        target: {
         files: [{
            expand: true,
            cwd: "dist/assets/stylesheets",
            src: ["*.css", "!*.min.css"],
            dest: "dist/assets/stylesheets",
            ext: ".min.css"
         }]
        }
    },

    includes: {
        build: {
          src: ["*.html", "security/*.html", "errors/*.html", "components/*.html"],
          dest: "dist/",
          cwd: "sources/html",
          options: {
            flatten: true,
          }
        }
      },

   connect: {
           server: {
               options: {
                   port: 9000,
                   base: "dist/",
                   hostname: "localhost",
                   livereload: true,
                   open: true
               }
           }
       },
    watch: {
         options: {
           livereload: true
       },
        less: {
         files: ["sources/less/**/*.less"],
         tasks: ["less:sb-admin", "cssmin"],
         options: {
            nospawn: true
         }
      },
      html: {
         files: ["sources/html/**/*.html"],
         tasks: [ "includes"],
         options: {
            nospawn: true
         }
      },
      dev: {
           files: ['Gruntfile.js'] //Monitora as auterações feitas no Gruntfile para não ser necessário ter que reiniciar o grunt.
        }
     }
   });
 };
