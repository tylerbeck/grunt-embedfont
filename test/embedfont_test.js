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
	convert: {
		convert_ttf_to_ttf: fileExists( "tmp/convert/fonts/OpenSans/OpenSans-Light.ttf", "TTF fonts should have be generated from TTF source."),
		convert_ttf_to_woff: fileExists( "tmp/convert/fonts/OpenSans/OpenSans-Light.woff", "WOFF fonts should have be generated from TTF source."),
		convert_ttf_to_eot: fileExists( "tmp/convert/fonts/OpenSans/OpenSans-Light.eot", "EOT fonts should have be generated from TTF source."),
		convert_ttf_to_svg: fileExists( "tmp/convert/fonts/OpenSans/OpenSans-Light.svg", "SVG fonts should have be generated from TTF source."),

		convert_otf_to_ttf: fileExists( "tmp/convert/fonts/Quicksand/Quicksand-Light.ttf", "TTF fonts should have be generated from OTF source."),
		convert_otf_to_woff: fileExists( "tmp/convert/fonts/Quicksand/Quicksand-Light.woff", "WOFF fonts should have be generated from OTF source."),
		convert_otf_to_eot: fileExists( "tmp/convert/fonts/Quicksand/Quicksand-Light.eot", "EOT fonts should have be generated from OTF source."),
		convert_otf_to_svg: fileExists( "tmp/convert/fonts/Quicksand/Quicksand-Light.svg", "SVG fonts should have be generated from OTF source.")
	},

	css: {
		css_generated: function( test ){
			var expected = grunt.file.read("test/fixtures/css/OpenSans.css");
			var actual = grunt.file.read("tmp/css/css/OpenSans.css");
			test.equal( actual, expected, "The generated CSS does not match the expected CSS.");
			test.done();
		}
	},

	less: {
		less_generated: function( test ){
			var expected = grunt.file.read("test/fixtures/less/OpenSans.less");
			var actual = grunt.file.read("tmp/less/less/OpenSans.less");
			test.equal( actual, expected, "The generated LESS does not match the expected LESS.");
			test.done();
		}
	}

};
