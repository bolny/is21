.PHONY: fe be

fe: 
	make -C ./src/frontend

be:
	make -C ./src/backend
	