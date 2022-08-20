<img align="right" src="https://raw.github.com/cliffano/swaggy-c/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://github.com/cliffano/swaggy-c/actions/workflows/ci-workflow.yaml/badge.svg)](https://github.com/cliffano/swaggy-c/actions/workflows/ci-workflow.yaml)
<br/>

Swaggy C
--------

Swaggy C is a builder for [OpenAPI Generator](https://openapi-generator.tech/)-generated API clients in multiple technology stacks.

It provides utility targets for generating the API clients, building, testing, and publishing the artifacts, from an OpenAPI spec in one go.

Have a look at [Swaggy Jenkins](http://github.com/cliffano/swaggy-jenkins) as an example project that was built using Swaggy C.

Installation
------------

Simply place `src/Makefile-swaggy-c` as the `Makefile` on your project.

Usage
-----

The following targets are available for use:

Configuration
-------------

Create Swaggy C configuration file called `swaggy-c.yml` which contains the following properties:

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

* [openapi-ipify](http://github.com/cliffano/openapi-ipify) - A set of Jenkins API clients in multiple languages generated from Swagger / Open API specification
* [pinterest-sdk](http://github.com/cliffano/pinterest-sdk) - A set of Jenkins API clients in multiple languages generated from Swagger / Open API specification
* [pokeapi-clients](http://github.com/cliffano/pokeapi-clients) - A set of Jenkins API clients in multiple languages generated from Swagger / Open API specification
* [swaggy-jenkins](http://github.com/cliffano/swaggy-jenkins) - A set of Jenkins API clients in multiple languages generated from Swagger / Open API specification
