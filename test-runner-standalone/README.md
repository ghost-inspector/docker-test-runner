Ghost Inspector test runner Docker images
-----------------------------------------
[Ghost Inspector](https://ghostinspector.com/) is an automated website testing
and monitoring service that checks for problems with your website or
application. It carries out operations in a browser, the same way a user would,
to ensure that everything is working properly.

This Docker image will allow you to execute your Ghost Inspector test suite
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
  -e APP_PORT=my-app:8000 \
  --network test-network \
  ghostinspector/test-runner-standalone
```

Make sure you change out all the environment variables to your own custom
values for `NGROK_TOKEN`, `GI_API_KEY`, and `GI_SUITE`. Notice that for
`APP_PORT` we've passed in `my-app:8000`, `my-app` will resolve to our running
docker container that we named `my-app` and `8000` assumes that is the port
that our application is running on. Finally we also connect this new container
to the same `test-network` so all the DNS and networking magic can happen. 

Once this container fires up, it will perform the exact same set of actions as
before:

 * start the `ngrok` daemon and open a tunnel to `my-app:8000`
 * execute the Ghost Inspector test suite based on `GI_SUITE`
 * poll the Ghost Inspector API for `passing` status until a result is provided
 * exit with the pass (`0`) or fail (`1`) status

Support
=======
Please open issues in Github or send questions to [Ghost Inspector support](https://ghostinspector.com/support/)