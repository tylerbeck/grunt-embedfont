/*
 * FontConverter
 * https://github.com/tylerbeck/grunt-embedfont
 *
 * Copyright (c) 2014 Tyler Beck
 * Licensed under the MIT license.
 *
 * Uses fontforge to convert fonts
 */

'use strict';

var q = require('q');
var _ = require('lodash');
var path = require('path');
var fs = require('fs-extra');
var exec = require('child_process').exec;

var svg2ttf = require('svg2ttf');
var otf2ttf = require('svg2ttf');
var ttf2svg = require('ttf2svg');
var ttf2eot = require('ttf2eot');
var ttf2woff = require('ttf2woff');


var NodeFontConverter = function( options ){

	options = options || {};

	var defaults = {
		overwrite: true,
		ignoreFstype: false,
		destinationBase: ''
	};


	_.extend( options, defaults );

	//TODO: check for fontforge dependency

	var self = this;

	var source;

	function getSourceTTF( font ){
		var file;
		var ext = path.extname( font ).toLowerCase();
		switch( ext ){
			case '.ttf':
				file = new Uint8Array( fs.readFileSync( font, { encoding: null } ) );
				break;
			default:
				break;

		}

		return file;
	}

	self.load = function( font ){

		if ( fs.existsSync( font ) ){
			source = getSourceTTF( font );
			if (!source){
				throw new Error("font source could not be parsed, only ttfs are supported with the node engine: "+font);
			}
		}
		else{
			throw new Error("could not resolve path: "+font);
		}
	};

	self.convert = function( destination, callback ){
		var deferred = q.defer();
		var destPath = path.join( options.destinationBase, destination );
		if ( options.overwrite || !fs.existsSync(destPath) ){
			var ext = path.extname( destPath );
			var out;
			switch ( ext ){
				case '.ttf':
					out = new Buffer( source );
					break;
				case '.woff':
					out = new Buffer( ttf2woff( source ) );
					break;
				case '.eot':
					out = new Buffer( ttf2eot( source ) );
					break;
				case '.svg':
					out = new Buffer( ttf2svg( source ) );
					break;
				default:
					throw new Error("unsupported font type: "+destPath);
					break;
			}

			//if ( out !== undefined ){
				//ensure folder exists
				fs.mkdirsSync( path.dirname( destination ) );
				//console.log( "out is buffer: "+( Buffer.isBuffer( out ) ) );
				fs.writeFile( destination, out, function( err ){
					if (err === null ){
						if (callback && typeof callback == "function"){
							callback();
						}

						deferred.resolve();
					}
					else{
						deferred.reject( "error writing "+destination+": "+ err );
					}

				} );

			//}
			//else{
			//	deferred.reject( 'buffer for '+destination+' could not be created' );
			//}

		}
		else{
			deferred.reject( destination + " already exists, remove file or set overwrite option to true." );
		}


		return deferred.promise;
	};

	return self;

};

module.exports = NodeFontConverter;

