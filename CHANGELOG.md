# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 3.0.1 - 2023-09-09
### Fixed
- Fix update-to-version target to retrieve correct Swaggy C Makefile

## 3.0.0 - 2023-08-27
### Added
- Add scm.git_user and scm.git_repo configuration properties

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
