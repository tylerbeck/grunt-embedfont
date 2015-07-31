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
			fontforge: {
				options:{
					fontPath: 'tmp/fontforge/fonts',
					stylePath: 'tmp/fontforge/less',
					relPath: '../fonts',
					output: 'less',
					engine: 'fontforge',
					reformatNames: false,
					fontTypes: ['ttf','woff', 'eot','svg']
				},
				fonts: {
					OpenSans: {
						normal: {
							'200': 'test/fixtures/fonts/OpenSans/OpenSans-Light.ttf'
						}
					},
					Quicksand: {
						normal: {
							'200': 'test/fixtures/fonts/Quicksand/Quicksand-Light.otf'
						}
					}
				}

			},
			node: {
				options:{
					fontPath: 'tmp/node/fonts',
					stylePath: 'tmp/node/less',
					relPath: '../fonts',
					output: 'less',
					engine: 'node',
					reformatNames: false,
					fontTypes: ['ttf','woff', 'eot','svg']
				},
				fonts: {
					OpenSans: {
						normal: {
							'200': 'test/fixtures/fonts/OpenSans/OpenSans-Light.ttf'
						}
					}
				}

			},
			css: {
				options:{
					fontPath: 'tmp/css/fonts',
					stylePath: 'tmp/css/css',
					relPath: '../fonts',
					output: 'css',
					reformatNames: false,
					fontTypes: ['ttf','woff', 'eot','svg']
				},
				fonts: {
					OpenSans: {
						normal: {
							'200': 'test/fixtures/fonts/OpenSans/OpenSans-Light.ttf',
							'400': 'test/fixtures/fonts/OpenSans/OpenSans-Regular.ttf',
							'700': 'test/fixtures/fonts/OpenSans/OpenSans-Bold.ttf'
						},
						italic: {
							'200': 'test/fixtures/fonts/OpenSans/OpenSans-LightItalic.ttf',
							'400': 'test/fixtures/fonts/OpenSans/OpenSans-Italic.ttf',
							'700': 'test/fixtures/fonts/OpenSans/OpenSans-BoldItalic.ttf'
						}
					}
				}
			},
			less: {
				options:{
					fontPath: 'tmp/less/fonts',
					stylePath: 'tmp/less/less',
					relPath: '../fonts',
					output: 'less',
					reformatNames: false,
					fontTypes: ['ttf','woff', 'eot','svg']
				},
				fonts: {
					OpenSans: {
						normal: {
							'200': 'test/fixtures/fonts/OpenSans/OpenSans-Light.ttf',
							'400': 'test/fixtures/fonts/OpenSans/OpenSans-Regular.ttf',
							'700': 'test/fixtures/fonts/OpenSans/OpenSans-Bold.ttf'
						},
						italic: {
							'200': 'test/fixtures/fonts/OpenSans/OpenSans-LightItalic.ttf',
							'400': 'test/fixtures/fonts/OpenSans/OpenSans-Italic.ttf',
							'700': 'test/fixtures/fonts/OpenSans/OpenSans-BoldItalic.ttf'
						}
					}
				}
			},
			sass: {
				options:{
					fontPath: 'tmp/sass/fonts',
					stylePath: 'tmp/sass/sass',
					relPath: '../fonts',
					output: 'scss',
					reformatNames: false,
					fontTypes: ['ttf','woff', 'eot','svg']
				},
				fonts: {
					OpenSans: {
						normal: {
							'200': 'test/fixtures/fonts/OpenSans/OpenSans-Light.ttf'
						}
					}
				}
			}


		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		},

		bump: {
			options: {
				files: ['package.json'],
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json'],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false,
				pushTo: 'upstream',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				regExp: false
			}
		}


	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-bump');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'embedfont', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
