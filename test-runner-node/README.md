Ghost Inspector test runner Docker images
-----------------------------------------
[Ghost Inspector](https://ghostinspector.com/) is an automated website testing
and monitoring service that checks for problems with your website or
application. It carries out operations in a browser, the same way a user would,
to ensure that everything is working properly.

This Docker image will allow you to execute your Ghost Inspector test suite
against your local Docker application.

There is also a standalone, multi-container Docker image available
[here](https://hub.docker.com/r/ghostinspector/test-runner-standalone/).


Quickstart
==========
Example `Dockerfile`:
```
FROM ghostinspector/test-runner-node

# Copy your node app
COPY . .

# Install your app
RUN npm install .

ENV NGROK_TOKEN <your-ngrok-token>
ENV GI_API_KEY <ghostinspector-api-key>
ENV GI_SUITE <ghostinspector-suite-id>
ENV APP_PORT 3000

# Pass your application entrypoint into our test runner script
ENTRYPOINT ["/bin/runghostinspectorsuite", "index.js"]
```

Base Docker Image
-----------------
This image is intended to be the base image for your application under test,
meaning that the application runtime and Ghost Inspector scripts and utilities
are pre-installed for you. 

To get started, specify the appropriate runtime in the `FROM` section of your
`Dockerfile`.

 * `ghostinspector/test-runner-node` - extends `node:8`
 * `ghostinspector/test-runner-python` - extends `TODO`

### Environment variables
As well as adding any dependencies or additional requirements for your
application, the following environment variables are required for the test
runner:

 * `NGROK_TOKEN` - available from your [ngrok account](https://ngrok.com/)
 * `GI_API_KEY` - available in your [Ghost Inspector account](https://app.ghostinspector.com/account)
 * `GI_SUITE` - the ID of the Ghost Inspector test suite you wish to run
 * `APP_PORT` - the port your local application will run on (eg: `3000`)

### Entry point
The last line of your `Dockerfile` should be `ENTRYPOINT`, which should look
something like this:

```
ENTRYPOINT ["/bin/runghostinspectorsuite", "index.js"]
```

Where `index.js` is the entrypoint for your application. Under the hood, our
[test runner script](includes/bin/runghostinspectorsuite) will perform the
following:

 * start the entrypoint specified in `ENTRYPOINT` (eg: `index.js`) with `node`
 * start the `ngrok` daemon and open a tunnel to `localhost:PORT`
 * execute the Ghost Inspector test suite based on `GI_SUITE`
 * poll the Ghost Inspector API for `passing` status until a result is provided
 * exit with the pass (`0`) or fail (`1`) status

Support
=======
Please open [issues in Github]() or send questions to [Ghost Inspector support](https://ghostinspector.com/support/)