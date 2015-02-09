# grunt-embedfont

> Create web-embeddable font files and css.

## Usage Notice
Before converting fonts, please ensure that you are allowed to do so.
End-users of this software are solely responsible for securing and maintaining the right to convert and use fonts from the fonts' copyright holder.


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

## Installation

### OS X

```
brew install ttfautohint fontforge --with-python
npm install grunt-embedfont --save-dev
```

*You may need to use `sudo` for `brew`, depending on your setup.*

### Linux

```
sudo apt-get install fontforge ttfautohint --with-python
npm install grunt-embedfont --save-dev
```

### Windows

```
npm install grunt-embedfont --save-dev
```
*windows users should use the node font engine setting.  The node engine currently only supports converting from ttf source fonts

## GruntFile

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-embedfont');
```

## The "embedfont" task

### Overview
In your project's Gruntfile, add a section named `embedfont` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  embedfont: {
    default: {
	    options:{
		    fontPath: 'assets/fonts',
		    stylePath: 'assets/less',
		    relPath: '../fonts',
		    output: 'less',
		    engine: 'fontforge'
	    },
	    fonts: {
		    FontFamilyOne: {
			    normal: {
				    '200': 'font-src/FontOne-Light.ttf',
				    '400': 'font-src/FontOne-Regular.ttf',
				    '700': 'font-src/FontOne-Bold.ttf'
			    },
			    italic: {
				    '200': 'font-src/FontOne-LightItalic.ttf',
				    '400': 'font-src/FontOne-RegularItalic.ttf',
				    '700': 'font-src/FontOne-BoldItalic.ttf'
			    }
		    },
		    FontFamilyTwo: {
			    normal: {
				    '400': 'font-src/FontTwo-Regular.ttf',
			    }
		    },
	    }

    },
  },
});
```

### Options

#### options.fontPath
Type: `String`
Default value: `'fonts'`

The font directory path; fonts will be saved to this path.

#### options.stylePath
Type: `String`
Default value: `'style'`

The style directory path; CSS / Less will be saved to this path.

#### options.relPath
Type: `String`
Default value: `'../fonts'`

The relative path from the style directory to font directory.

#### options.output
Type: `String`
Default value: `'less'`
Possible values: `'less'` `'css'`

The format of stylesheet to output.

#### options.engine
Type: `String`
Default value: `'fontforge'`
Possible values: `'fontforge'` `'node'`

The node engine can currently only convert from ttf source fonts.

#### options.reformatNames
Type: `Boolean`
Default value: `true`

When reformat names is set to true, font names are created using options.reformatFn.

#### options.reformatFn
Type: `Function`
Function Signature: `function( name, style, weight ){ return fontNameString; }`
Default function return value: `[name]-[weight]-[style]`

Reformat function should return a font name without extension.


#### options.fontTypes
Type: `Array of Strings`
Default value: `['ttf','woff','eot','svg']`

An array of font types to generate.

### Usage Examples

TODO

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0
0.2.0