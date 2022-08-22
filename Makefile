ci: lint test

lint:
	checkmake src/Makefile-swaggy-c

test:
	echo "todo"

release-major:
	rtk release --release-increment-type major

release-minor:
	rtk release --release-increment-type minor

release-patch:
	rtk release --release-increment-type patch

release: release-minor

.PHONY: all ci lint test release-major release-minor release-patch
