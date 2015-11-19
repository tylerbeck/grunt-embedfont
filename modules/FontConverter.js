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


var FontConverter = function( options ){

	options = options || {};

	var defaults = {
		overwrite: true,
		ignoreFstype: false,
		destinationBase: ''
	};


	_.extend( options, defaults );

	//TODO: check for fontforge dependency

	var self = this;

	var sourcePath = "";

	self.load = function( font ){
		if ( fs.existsSync( font ) ){
			sourcePath = path.resolve( font );
			//TODO: verify file is valid font source file
		}
		else{
			throw new Error("could not resolve path: "+font);
		}
	};

	self.convert = function( destination, callback ){
		var deferred = q.defer();
		var destPath = path.resolve( destination );
		if ( options.overwrite || !fs.existsSync(destPath) ){
			//TODO: verify destPath is valid font format

			//ensure folder exists
			fs.mkdirsSync( path.dirname( destination ) );
			exec(   "fontforge -lang=ff -c 'Open($1); Generate($2)' '"+sourcePath+"' '"+destPath+"'",
					function( error, stdout, stderr ){

						if (error instanceof Error){
							deferred.reject( error );
							if ( callback ){
								throw error;
							}
						}

						if (callback && typeof callback === "function"){
							callback();
						}

						deferred.resolve();

					});

			//deferred.resolve();
		}


		return deferred.promise;
	};

	return self;

};

module.exports = FontConverter;

