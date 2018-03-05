FROM busybox:ubuntu-14.04
MAINTAINER Ghost Inspector <help@ghostinspector.com>

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

# Add the script that will run the tes suite.
COPY ./includes/bin/runghostinspectorsuite /bin/runghostinspectorsuite

# This is the port you can use to interact with ngrok's API.
EXPOSE 4040

# The primary script.
ENTRYPOINT ["/bin/runghostinspectorsuite"]