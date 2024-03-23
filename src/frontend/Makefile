default: dev
.PHONY: html js run

dev: html js

build/:
	mkdir -p ./build

js: build/
	node esbuild.mjs
	
html: build/
	cp -R ./is21/*.html ./build

clean:
	rm -rf build/
