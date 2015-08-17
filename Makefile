build:
	./node_modules/.bin/browserify lib/index.js -o dist/index.js -s WindowListener

default: build
