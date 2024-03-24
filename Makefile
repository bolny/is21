default: devserver
.PHONY: devserver staticdir build run

BUILDDIR=./src/frontend/build
STATICDIR=./src/backend/is21/api/static

staticdir:
	mkdir -p $(STATICDIR)

build: staticdir
	make -C ./src/frontend
	cp $(BUILDDIR)/* $(STATICDIR)

devserver: build
	make -C ./src/backend

run:
	make -C ./src/backend

	