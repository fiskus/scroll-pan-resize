build:
	./node_modules/.bin/browserify lib/index.js -o dist/index.js -s WindowListener

serve:
	./node_modules/.bin/hs . -o

default: build
