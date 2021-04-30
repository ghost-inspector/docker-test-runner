FROM node:12
MAINTAINER Ghost Inspector <help@ghostinspector.com>

# Install jq.
ADD http://stedolan.github.io/jq/download/linux64/jq /bin/jq
RUN chmod +x /bin/jq

# Install the Ghost Inspector client.
RUN npm install -g ghost-inspector

# The primary script.
ENTRYPOINT ["/usr/local/bin/ghost-inspector"]
