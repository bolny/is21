default: run
.PHONY: html js ts run

dev: html js

build/:
	mkdir -p ./build

js: ts build/
	node esbuild.mjs
	
ts:
	./node_modules/.bin/tsc --project .	
	
html: build/
	cp -R ./is21/*.html ./build

run: dev
	./node_modules/.bin/http-server ./build
	
clean:
	rm -rf build/
