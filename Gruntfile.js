module.exports = function(grunt) {

  grunt.initConfig({
    elm: {
      compile: {
        files: {
          "exchange.js": ["Exchange.elm"]
        }
      }
    },
    watch: {
      elm: {
        files: ["Exchange.elm"],
        tasks: ["elm"],
        options: {
          livereload: 35729
        }
      }
    },
    clean: ["elm-stuff/build-artifacts"]
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-elm');

  grunt.registerTask('default', ['elm']);

};
