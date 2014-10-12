'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

function fileExists( path, msg  ){
	return function( test ){
		var value = grunt.file.exists( path );
		test.equal( value, true, "The file '"+path+"'  should exist."  );
		test.done();
	}
}

exports.embedfont = {

	//tests based on the default embedfont task
	default: {

		setUp: function(done) {
			// setup here if necessary
			done();
		},
		tearDown: function (done) {
			// clean up
			done();
		},

		encoding_ttf_to_ttf: fileExists( "tmp/fonts/OpenSans/OpenSans-Light.ttf", "TTF fonts should have be generated from TTF source."),
		encoding_ttf_to_woff: fileExists( "tmp/fonts/OpenSans/OpenSans-Light.woff", "WOFF fonts should have be generated from TTF source."),
		encoding_ttf_to_eot: fileExists( "tmp/fonts/OpenSans/OpenSans-Light.eot", "EOT fonts should have be generated from TTF source."),
		encoding_ttf_to_svg: fileExists( "tmp/fonts/OpenSans/OpenSans-Light.svg", "SVG fonts should have be generated from TTF source."),

		encoding_otf_to_ttf: fileExists( "tmp/fonts/Quicksand/Quicksand-Light.ttf", "TTF fonts should have be generated from OTF source."),
		encoding_otf_to_woff: fileExists( "tmp/fonts/Quicksand/Quicksand-Light.woff", "WOFF fonts should have be generated from OTF source."),
		encoding_otf_to_eot: fileExists( "tmp/fonts/Quicksand/Quicksand-Light.eot", "EOT fonts should have be generated from OTF source."),
		encoding_otf_to_svg: fileExists( "tmp/fonts/Quicksand/Quicksand-Light.svg", "SVG fonts should have be generated from OTF source.")

	}

};
