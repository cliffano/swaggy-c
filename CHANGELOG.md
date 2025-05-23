# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 4.10.0 - 2025-04-28
### Changed
- Run Python commands with venv

### Removed
- Remove Python .egg file from package creation/installation

## 4.9.2 - 2025-04-27
### Fixed
- Fix missing setuptools now that apt package no longer exists

## 4.9.1 - 2025-04-27
### Fixed
- Fix build-python with Python 3.12 support

## 4.9.0 - 2025-04-27
### Changed
- Upgrade OpenAPI Generator to 7.12.0

## 4.8.0 - 2024-11-02
### Added
- Add libyaml-dev to build-ruby

### Changed
- Move mocha instalation from deps target to test-javascript target
- Move validator installation from build-javascript to test-javascript
- Upgrade OpenAPI Generator to 7.9.0

### Removed
- Remove sudo for python-setuptools installation from build-python

### Fixed
- Fix base dir setting when running CI workflow

## 4.7.0 - 2024-07-05
### Added
- Add url-spec example

### Changed
- Rename example to file-spec example
- Upgrade OpenAPI Generator to 7.7.0
- Reorder base_dir config sequence to CUSTOM, GITHUB_ACTIONS, LOCAL

## 4.6.0 - 2024-06-23
### Added
- Add validator package installation to build-javascript
- Add validators package installation to build-python

## 4.5.0 - 2024-06-21
### Added
- Add support to customise the application base directory

### Changed
- Upgrade OpenAPI Generator to 7.6.0

## 4.4.0 - 2024-05-14
### Added
- Add pytest to build-python and test-python

### Changed
- Upgrade OpenAPI Generator to 7.5.0

## 4.3.0 - 2024-03-12
### Changed
- Update OAG languages based on OAG 7.4.0

## 4.2.0 - 2024-03-12
### Changed
- Upgrade OpenAPI Generator to 7.4.0

## 4.1.0 - 2024-01-07
### Changed
- Upgrade OpenAPI Generator to 7.2.0

## 4.0.1 - 2023-09-09
### Fixed
- Revert all references of python-nextgen to python

## 4.0.0 - 2023-09-09
### Changed
- Upgrade OpenAPI Generator to 7.0.0

## 3.0.1 - 2023-09-09
### Fixed
- Fix update-to-version target to retrieve correct Swaggy C Makefile

## 3.0.0 - 2023-08-27
### Added
- Add scm.git_user and scm.git_repo configuration properties (credit: @dominicbarnes, via https://github.com/oapicf/pokeapi-clients/pull/2)

### Changed
- Upgrade OpenAPI Generator to 6.6.0

## 2.1.0 - 2023-03-04
### Added
- Re-add python language to co-exist with python-nextgen

### Changed
- Replace python with python-nextgen as primary language
- Replace python build targets with python-nextgen

## 2.0.0 - 2023-03-03
### Added
- Add python-nextgen language

### Changed
- Upgrade OpenAPI Generator to 6.3.0

### Removed
- Remove python language

## 1.1.0 - 2022-11-18
### Added
- Add update-to-latest and update-to-version targets

### Changed
- Modify clean target to also clean up stage/ directory
- Upgrade OpenAPI Generator to 6.2.1

## 1.0.0 - 2022-08-22
### Changed
- Switch implementation to Makefile
- Switch generator to OpenAPI Generator
- Replace Travis with GH Actions

## 0.1.0 - 2017-08-02
### Added
- Add clean commands for all languages
- Add client generation for all languages supported by Swagger CodeGen as of 20170601
- Handle language containing dash

### Fixed
- Fix command format params merging

## 0.0.1 - 2017-07-22
### Added
- Initial version
