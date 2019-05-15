Ghost Inspector test runner Docker images
-----------------------------------------

**Build status**: ![build status](https://circleci.com/gh/ghost-inspector/docker-test-runner/tree/master.svg?style=shield&circle-token=245dca7e57995c5746b1fdb43ed8d645a6c8aa81)

[Ghost Inspector](https://ghostinspector.com/docs/getting-started/) is an automated website testing
and monitoring service that checks for problems with your website or
application. It carries out operations in a browser, the same way a user would,
to ensure that everything is working properly.

This Docker image will allow you to execute your [Ghost Inspector test suite](https://ghostinspector.com/docs/getting-started/)
against another running Docker container within your cluster.

There is also single-container Docker image available
[here](https://hub.docker.com/r/ghostinspector/test-runner-node/).

Multi-container test runner
---------------------------
Even in more complex scenarios it is still possible to test your application
through the magic of Docker by using the 
`ghost-inspector/test-runner-standalone` image and
[Docker container networking](https://docs.docker.com/v17.09/engine/userguide/networking/).

First, pull down the `ghostinspector/test-runner-standalone` image to your
local environment:

```
$ docker pull ghostinspector/test-runner-standalone
```

Next we will create a new network in Docker-land so we can link the applications
at runtime:

```
$ docker network create test-network
```

Then we can start your application in the background (`-d`), make sure and
change `<my-image>` to the name of your local Docker image:

```
$ docker run -d --name my-app --network test-network <my-image>
```

Here we have named the new container `my-app` and connected it to the network
`test-network`. Once that's up and running, we can fire up the Ghost Inspector 
`test-runner-standalone` container which will run our suite against our running
app:

```
$ docker run \
  -e NGROK_TOKEN=<my-ngrok-token> \
  -e GI_API_KEY=<my-api-key> \
  -e GI_SUITE=<my-suite-id> \
  -e GI_PARAM_myVar=foo \
  -e APP_PORT=my-app:8000 \
  --network test-network \
  ghostinspector/test-runner-standalone
```

Make sure you change out all the environment variables to your own custom
values for `NGROK_TOKEN`, `GI_API_KEY`, and `GI_SUITE`. Notice that for
`APP_PORT` we've passed in `my-app:8000`, `my-app` will resolve to our running
docker container that we named `my-app` and `8000` assumes that is the port
that our application is running on. Finally we also connect this new container
to the same `test-network` so all the DNS and networking magic can happen. Also
note that you can send custom variables to the API call when we execute your
test suite by using a custom environment variable named `GI_PARAM_varName`
where `varName` is the name of your variable. This will be available in your
Ghost Inspector tests under `{{varName}}` at runtime. Finally, if you wish to have the build status based on the screenshot instead, you may want to add an environment variable for `GI_PASSING_STATUS_KEY` with a value of `screenshotComparePassing`.

Once this container fires up, it will perform the exact same set of actions as
before:

 * start the `ngrok` daemon and open a tunnel to `my-app:8000`
 * execute the Ghost Inspector test suite based on `GI_SUITE`
 * poll the Ghost Inspector API for `passing` status until a result is provided
 * exit with the pass (`0`) or fail (`1`) status

LICENSE
=======
```
The MIT License

Copyright (c) Ghost Inspector, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

Support
=======
Please open issues in Github or send questions to [Ghost Inspector support](https://ghostinspector.com/support/)