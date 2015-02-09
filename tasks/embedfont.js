/*
 * grunt-embedfont
 * https://github.com/tylerbeck/grunt-embedfont
 *
 * Copyright (c) 2014 Tyler Beck
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

	var FontConverter = require('../modules/FontConverter');
	var NodeFontConverter = require('../modules/NodeFontConverter');
	var _ = require('lodash');
	var path = require('path');
	var q = require('q');
	var fs = require('fs-extra');


	grunt.registerMultiTask('embedfont', 'Create web-embeddable font files and css.', function() {
		// Merge task-specific and/or target-specific options with these defaults.

		var task = this;

		var options = task.options({
			fontPath: 'fonts',
			stylePath: 'style',
			relPath: '../fonts',
			output: 'less',
			engine: 'fontforge',
			reformatNames: true,
			reformatFn: getFontName,
			fontTypes: ['ttf','woff','eot','svg']
		});

		var fontFamilies;

		function execute(){
			fontFamilies = [];
			grunt.verbose.write( "[embedfont] Fonts:" );
			grunt.verbose.writeln( JSON.stringify( task.data.fonts, undefined, "   ") );

			var fonts = task.data.fonts;
			var fontNames = Object.keys( fonts );
			var done = task.async();
			var queue = [];

			/*if ( !fonts || fontNames.length == 0 ){
				grunt.fail.warn("At least one font must be configured")
			}*/

			fontNames.forEach( function( name ){
				grunt.log.writeln('[embedfont] '+name);
				queue.push( function(){
					return makeEmbeddable( name, fonts[name] );
				});
			});


			queue.reduce( q.when, q(true) )
					.then( function(){
						outputStyles();
						done();
					} )
					.fail( function( error ) {
						grunt.fail.warn( error );
					});

		}

		function getFontName(name, style, weight ){

			var parts;

			if( style.toLowerCase() == 'normal') {
				parts = [ name, weight ];
			}
			else{
				style = style.charAt( 0 ).toUpperCase() + style.slice( 1 );
				parts = [ name, weight, style ];
			}

			return parts.join('-')

		}

		function makeEmbeddable( name, config ){
			grunt.verbose.writeln('[embedfont] makeEmbeddable - '+name);
			var deferred = q.defer();
			var conversionQueue = [];
			var faces = [];
			var artifacts = [];
			//iterate defined styles
			var styles = Object.keys( config );
			styles.forEach( function( style ){

				//iterate defined weights
				var weights = Object.keys( config[ style ] );
				weights.forEach( function( weight ){

					//TODO: add ability to alias another style/weight
					//get source and load into converter
					var source = config[ style ][ weight ];
					grunt.verbose.writeln('');
					grunt.verbose.writeln('            source: '+source);
					var fontName;
					if ( options.reformatNames ){
						fontName = options.reformatFn( name, style, weight );
					}
					else{
						fontName = path.basename( source, path.extname( source ) );
					}

					grunt.verbose.writeln('              name: '+fontName);


					var converter;
					if ( options.engine === 'fontforge' ){
						converter = new FontConverter();
					}
					else{
						converter = new NodeFontConverter();
					}

					converter.load( source );

					//add conversion to queue for each font type
					grunt.verbose.writeln('             files:');
					faces.push( { style:style, weight:weight, path: path.join( options.relPath, name, fontName) });
					artifacts.push( path.join( options.fontPath, name, fontName+".afm" ) );
					options.fontTypes.forEach( function( type ){
						var dest = path.join( options.fontPath, name, fontName+"."+type );
						grunt.verbose.writeln('                  '+type+' -> '+dest);
						//add conversion method to queue
						conversionQueue.push( function(){
							grunt.verbose.writeln( 'creating: '+dest);
							return converter.convert( dest );
						});
					});
				});
			});

			//execute conversion queue
			conversionQueue.reduce( q.when, q(true) )
					.then( function(){
						//remove artifacts
						artifacts.forEach( function(path){
							fs.removeSync( path );
						});

						//once conversions have successfully completed, build less/css/scss
						addFontFamily( name, options.fontTypes, faces );

						deferred.resolve();
					} )
					.fail( function( error ) {
						deferred.reject( error );
					});

			return deferred.promise;
		}

		function addFontFamily( name, types, faces ){
			fontFamilies.push( {
				name: name,
				faces: faces
			} );
		}

		function outputStyles(){

			_.templateSettings.variable = "data";

			var templatePath = path.join(__dirname, "../templates/style", options.output+".template" );
			if ( grunt.file.exists( templatePath ) ){
				var template = _.template( grunt.file.read( templatePath ) );
				var style = template( { families: fontFamilies, types: options.fontTypes.slice(0) } );
				var filename = [ task.target, 'fonts' ].join('-');
				grunt.file.write( path.join( options.stylePath, filename+"."+options.output ), style );
			}
			else{
				throw new Error("Couldn't find "+options.output+".template");
			}
		}


		execute();

	});

};
