<img align="right" src="https://raw.github.com/cliffano/swaggy-c/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://img.shields.io/travis/cliffano/swaggy-c.svg)](http://travis-ci.org/cliffano/swaggy-c)
[![Dependencies Status](https://img.shields.io/david/cliffano/swaggy-c.svg)](http://david-dm.org/cliffano/swaggy-c)
[![Coverage Status](https://img.shields.io/coveralls/cliffano/swaggy-c.svg)](https://coveralls.io/r/cliffano/swaggy-c?branch=master)
[![Published Version](https://img.shields.io/npm/v/swaggy-c.svg)](http://www.npmjs.com/package/swaggy-c)
<br/>
[![npm Badge](https://nodei.co/npm/swaggy-c.png)](http://npmjs.org/package/swaggy-c)

Swaggy C
--------

Swaggy C is a builder for Swagger CodeGen-generated API clients in multiple languages.

It's handy for generating multiple API clients, along with documentations and package artifacts, from an OpenAPI spec in one go.

(WIP) This builder provides convenient commands for executing the following actions:

- {lang}-gen: generating API client using Swagger CodeGen
- {lang}-deps: resolving dependencies
- {lang}-test: running generated unit tests
- {lang}-package: building package artifact
- {lang}-install: installing package locally
- {lang}-doc: generating documentation
- {lang}-publish: publishing package to public repository

Have a look at [Swaggy Jenkins](http://github.com/cliffano/swaggy-jenkins) as an example project that was built using Swaggy C.

Installation
------------

    npm install -g swaggy-c

Usage
-----

Build a JavaScript API client with a given spec:

    swaggy-c --api-spec /path/to/spec.yaml javascript

The generated JavaScript client will then be written to output directory specified in `--out-dir` flag.

Build the client using Swagger CodeGen CLI jar, handy for using custom built jar (e.g. from master branch):

    swaggy-c --jar /path/to/swagger-codegen-cli.jar --api-spec /path/to/spec.yaml javascript

Build the client using specific configuration, output, and log directories:

    swaggy-c --conf-file /path/to/conf.json --out-dir /path/to/generated/ --log-dir /path/to/log --api-spec /path/to/spec.yaml javascript

Build the client and supress Swagger CodeGen CLI command output:

    swaggy-c --quiet --api-spec /path/to/spec.yaml javascript

List all available commands for all supported languages:

    swaggy-c --help

Configuration
-------------

The configuration file that's specified in `--conf-file` flag should be Swagger CodeGen language configuration file.

Adding new language
-------------------

As Swagger CodeGen keeps evolving, new languages will be added throughout time. To add a new language support to Swaggy C:

1. Update `conf/tasks.yml` with the new language and its commands for performing clean, gen, deps, test, package, install, doc, publish tasks
2. Update `conf/commands.json` with the new language's commands

Colophon
--------

[Developer's Guide](http://cliffano.github.io/developers_guide.html#nodejs)

Build reports:

* [Code complexity report](http://cliffano.github.io/swaggy-c/complexity/plato/index.html)
* [Unit tests report](http://cliffano.github.io/swaggy-c/test/buster.out)
* [Test coverage report](http://cliffano.github.io/swaggy-c/coverage/buster-istanbul/lcov-report/lib/index.html)
* [Integration tests report](http://cliffano.github.io/swaggy-c/test-integration/cmdt.out)
* [API Documentation](http://cliffano.github.io/swaggy-c/doc/dox-foundation/index.html)

Related Projects:

* [packer-swaggy-c](http://github.com/cliffano/packer-swaggy-c) - Packer builder of a Docker image that contains most languages supported by Swagger CodeGen
* [swaggy-jenkins](http://github.com/cliffano/swaggy-jenkins) - A set of Jenkins API clients in multiple languages generated from Swagger / Open API specification
