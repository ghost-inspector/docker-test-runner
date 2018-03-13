Docker Test Runner
==================

**Build status**: ![build status](https://circleci.com/gh/ghost-inspector/docker-test-runner/tree/master.svg?style=shield&circle-token=245dca7e57995c5746b1fdb43ed8d645a6c8aa81)


Ghost Inspector test runner images can be used within your local or CI
environment to test your docker application. These docker images utilize
[ngrok](https://ngrok.com/), a utility for creating temporary, secure VPN
tunnels to access your Docker application.

There are 2 configurations:

 * [node.js base-image](./test-runner-node) (`ghostinspector/test-runner-node`)
 * [standalone](./test-runner-standalone) (`ghostinspector/test-runner-standalone`)

Base Image (basic)
------------------
```
$ docker pull ghostinspector/test-runner-node
```

The base image test runner is designed for you to extend with your source
files for the purpose of testing your application. An example of using this
method can be found in the [README](./test-runner-node).

[Dockerfile available here](./test-runner-node/Dockerfile).

[View image on Docker Hub](https://hub.docker.com/r/ghostinspector/test-runner-node/).


Standalone (advanced)
---------------------
```
$ docker pull ghostinspector/test-runner-standalone
```

The standalone test runner is designed for use within an existing docker
environment where it is not possible (or desireable) to change the base
configuration of your container through the use of [Docker container networking](https://docs.docker.com/v17.09/engine/userguide/networking/). More details can
be found in the [README](./test-runner-standalone).

[Dockerfile available here](./test-runner-standalone/Dockerfile).

[View image on Docker Hub](https://hub.docker.com/r/ghostinspector/test-runner-standalone/).

Development
===========
Changes pushed to Github will automatically be built (and published) by our CI system.

Support
=======
Please open issues in Github or send questions to [Ghost Inspector support](https://ghostinspector.com/support/).

Changelog
=========
 * 2018-03-05 - initial version.
