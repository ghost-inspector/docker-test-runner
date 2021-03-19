FROM node:12
MAINTAINER Ghost Inspector <help@ghostinspector.com>

# Install unzip
RUN wget -qO- https://oss.oracle.com/el4/unzip/unzip.tar | tar -x -C /bin/

# Install ngrok (latest official stable from https://ngrok.com/download).
ADD https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip /ngrok.zip
RUN set -x \
 && unzip -o /ngrok.zip -d /bin \
 && rm -f /ngrok.zip

# Add ngrok config.
COPY ./includes/ngrok.yml /home/ngrok/.ngrok2/

# Install jq.
ADD http://stedolan.github.io/jq/download/linux64/jq /bin/jq
RUN chmod +x /bin/jq

# Install the Ghost Inspector client.
RUN npm install ghost-inspector

# Add GI executables.
COPY ./includes/bin/run-suite.js /bin/run-suite.js
COPY ./includes/bin/run-test.js /bin/run-test.js
COPY ./includes/bin/runghostinspectorsuite /bin/runghostinspectorsuite

# add our user
RUN useradd -ms /bin/bash ghostinspector
USER ghostinspector
WORKDIR /home/ghostinspector

# This is the port you can use to interact with ngrok's API.
EXPOSE 4040

# The primary script.
CMD ["/bin/runghostinspectorsuite"]
