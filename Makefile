TESTS = test/*.js
test:
	@./node_modules/.bin/mocha --timeout 5000  $(TESTS)

.PHONY: test