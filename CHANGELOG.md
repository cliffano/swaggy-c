# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

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
