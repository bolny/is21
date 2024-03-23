default: dev
.PHONY: html js run

dev: html css js

build/:
	mkdir -p ./build

js: build/
	node esbuild.mjs

css: build/
	cp -R ./is21/*.css ./build
	
html: build/
	cp -R ./is21/*.html ./build

clean:
	rm -rf build/
