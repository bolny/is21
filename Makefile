default: dev
.PHONY: dev staticdir

BUILDDIR=./src/frontend/build
STATICDIR=./src/backend/is21/api/static

staticdir:
	mkdir -p $(STATICDIR)

dev: staticdir
	make -C ./src/frontend
	cp $(BUILDDIR)/* $(STATICDIR)
	make -C ./src/backend

	