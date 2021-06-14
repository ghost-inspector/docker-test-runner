FROM node:14
MAINTAINER Ghost Inspector <help@ghostinspector.com>

# Install wait-for-it
RUN apt-get update \
  && apt-get install -y wait-for-it \
  && rm -rf /var/lib/apt/lists/*

# Install unzip
RUN wget -qO- https://oss.oracle.com/el4/unzip/unzip.tar | tar -x -C /bin/

# Install ngrok (latest official stable from https://ngrok.com/download).
ADD https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip /ngrok.zip
RUN set -x \
 && unzip -o /ngrok.zip -d /bin \
 && rm -f /ngrok.zip

# Install jq.
ADD http://stedolan.github.io/jq/download/linux64/jq /bin/jq
RUN chmod +x /bin/jq

# Install the Ghost Inspector client.
RUN npm install ghost-inspector
RUN ln -s /node_modules/.bin/ghost-inspector /bin/ghost-inspector

# Add GI executables.
COPY ./includes/bin/run-suite.js /bin/run-suite.js
COPY ./includes/bin/run-test.js /bin/run-test.js
COPY ./includes/bin/runghostinspectorsuite /bin/runghostinspectorsuite

# add our user
RUN useradd -ms /bin/bash ghostinspector
USER ghostinspector
WORKDIR /home/ghostinspector

# Add ngrok config (chown requires docker 17.09+)
COPY --chown=ghostinspector:ghostinspector ./includes/ngrok.yml .ngrok2/

# This is the port you can use to interact with ngrok's API.
EXPOSE 4040

# The primary script.
CMD ["/bin/runghostinspectorsuite"]
