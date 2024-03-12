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

1. Copy `src/Makefile-swaggy-c` to be the `Makefile` of your project:
    curl https://raw.githubusercontent.com/cliffano/swaggy-c/main/src/Makefile-swaggy-c -o Makefile
2. Create configuration file `swaggy-c.yml` with properties described in [Configuration](#configuration) section
3. Run the available `Makefile` targets described in [Usage](#usage) section

Configuration
-------------

Create Swaggy C configuration file called `swaggy-c.yml` with contains the following properties:

| Property | Description | Example |
|----------|-------------|---------|
| spec_uri | File path or URL where the OpenAPI specification is located | `spec/some-app.yaml` or `https://some-app.com/some-app.yaml` |
| version | Version of the application using Swaggy C | `1.2.3` |
| contact.name | Contact name to be amended to the OpenAPI specification | `John Citizen` |
| contact.url | Contact URL to be amended to the OpenAPI specification | `https://some-app.com` |
| contact.email | Contact email to be amended to the OpenAPI specification | `johnc@some-app.com` |
| scm.git_user | Git user/org name to be amended to the generated  OpenAPI Generator configuration | `johncitizen` |
| scm.git_repo | Git repo name to be amended to the generated OpenAPI Generator configuration | `some-app` |
| base_dir.github_actions | Absolute path where the application base directory is located within GitHub Actions runner | `/home/runner/work/some-app/some-app` |
| base_dir.local | Absolute path where the application base directory is located within your local environment | `/Users/some-user/some-path/some-app` |

Usage
-----

The following targets are available:

| Target | Description |
|--------|-------------|
| ci | CI target to be executed by CI/CD tool |
| stage | Ensure stage directory exists |
| clean | Remove all generated API clients code |
| deps | Retrieve the OpenAPI Generator Docker image and npm modules |
| init-spec | Initialise OpenAPI specification from either a local file path or a remote URL |
| init-langs-config | Initialise empty configuration file for all languages |
| update-to-latest | Update Makefile to the latest version on origin's main branch |
| update-to-version | Update Makefile to the version defined in TARGET_SWAGGY_C_VERSION parameter |
| generate | Alias for generate-all target |
| generate-all | Generate API clients for all languages, this is separate from generate-primary target in order to reduce the build time when processing primary languages |
| generate-primary | Generate API clients for primary languages only |
| build-<lang> | API clients building targets for primary languages |
| test-<lang> | API clients testing targets for primary languages |
| publish-<lang> | API clients package publishing targets for primary languages |
| doc | Alias for doc-latest target |
| doc-latest | Generate API documentation locally as the latest version |
| doc-version | Generate API documentation locally as the application's version |
| doc-publish | Publish documentation via GitHub Pages |

Upgrade Guide
-------------

To 4.x.x:

* Revert all references of python-nextgen to python

To 2.x.x:

* Copy clients/python/conf.json to clients/python-nextgen/conf.json
* Rename all references of python to python-nextgen in GitHub Actions assets

Colophon
--------

Related Projects:

* [openapi-ipify](http://github.com/cliffano/openapi-ipify) - OpenAPI v3 specification and a set of generated API clients for [ipify](https://www.ipify.org/)
* [pinterest-sdk](http://github.com/cliffano/pinterest-sdk) - A set of [Pinterest ](https://pinterest.com/) SDK in multiple languages generated from Open API specification
* [pokeapi-clients](http://github.com/cliffano/pokeapi-clients) - A set of [PokéAPI](https://pokeapi.co/) clients in multiple languages generated from Open API specification
* [swaggy-jenkins](http://github.com/cliffano/swaggy-jenkins) - A set of [Jenkins](https://www.jenkins.io/) API clients in multiple languages generated from Swagger / Open API specification
