default: dev
.PHONY: html js ts

dev: html js

build/:
	mkdir -p ./build

js: ts build/
	node esbuild.mjs
	
ts:
	./node_modules/.bin/tsc --project .	
	
html: build/
	cp -R ./is21/*.html ./build
	
clean:
	rm -rf build/