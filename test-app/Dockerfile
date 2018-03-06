FROM ghostinspector/test-runner-node

# Copy your node app
COPY . .

# Pass your application entrypoint into our test runner script
ENTRYPOINT ["/bin/runghostinspectorsuite", "index.js", "--myCliVar=my-cli-var"]
