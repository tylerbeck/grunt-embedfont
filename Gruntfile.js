/*
 * grunt-embedfont
 * https://github.com/tylerbeck/grunt-embedfont
 *
 * Copyright (c) 2014 Tyler Beck
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
	      'tasks/*.js',
	      'modules/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    embedfont: {
        default: {
	        options:{
		        fontPath: 'tmp/fonts',
		        stylePath: 'tmp/less',
		        relPath: '../fonts',
		        output: 'less',
		        reformatNames: false,
		        fontTypes: ['ttf','woff', 'eot','svg']
	        },
	        fonts: {
		        OpenSans: {
			        normal: {
				        '200': 'test/src/fonts/OpenSans/OpenSans-Light.ttf',
				        '400': 'test/src/fonts/OpenSans/OpenSans-Regular.ttf',
				        '700': 'test/src/fonts/OpenSans/OpenSans-Bold.ttf'
			        },
			        italic: {
				        '200': 'test/src/fonts/OpenSans/OpenSans-LightItalic.ttf',
				        '400': 'test/src/fonts/OpenSans/OpenSans-Italic.ttf',
				        '700': 'test/src/fonts/OpenSans/OpenSans-BoldItalic.ttf'
			        }
		        },
		        Quicksand: {
			        normal: {
				        '200': 'test/src/fonts/Quicksand/Quicksand-Light.otf',
				        '400': 'test/src/fonts/Quicksand/Quicksand-Regular.otf',
				        '700': 'test/src/fonts/Quicksand/Quicksand-Bold.otf'
			        },
			        italic: {
				        '200': 'test/src/fonts/Quicksand/Quicksand-LightItalic.otf',
				        '400': 'test/src/fonts/Quicksand/Quicksand-Italic.otf',
				        '700': 'test/src/fonts/Quicksand/Quicksand-BoldItalic.otf'
			        }
		        },

		        "Quicksand-Dash": {
			        normal: {
				        '400': 'test/src/fonts/Quicksand/Quicksand_Dash.otf'
			        }
		        }
	        }

        }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'embedfont', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
