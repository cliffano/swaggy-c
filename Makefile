ci: clean lint test

clean:
	rm -rf examples/*/clients/ examples/*/stage/

lint:
	checkmake src/Makefile-swaggy-c

test:
	cd examples/file-spec/ && \
	  make -f ../src/Makefile-swaggy-c clean deps init-spec init-langs-config generate update-to-latest
	cd examples/url-spec/ && \
	  make -f ../src/Makefile-swaggy-c clean deps init-spec init-langs-config generate update-to-latest

release-major:
	rtk release --release-increment-type major

release-minor:
	rtk release --release-increment-type minor

release-patch:
	rtk release --release-increment-type patch

release: release-minor

.PHONY: all ci clean lint test release-major release-minor release-patch
