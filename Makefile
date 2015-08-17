build:
	browserify lib/index.js -o dist/index.js -s WindowListener

default: build
