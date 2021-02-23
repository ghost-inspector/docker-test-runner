var http = require('http');

// These variables are provided at runtime
const envVar = process.env.MY_ENV_VAR;
const sha = process.argv[2];
const buildNumber = process.argv[3];

http.createServer(function (req, res) { 
  res.writeHead(200, {'Content-Type': 'text/html'}); 
  res.end(`
<html>
  <body>
    <h2>Base image test</h2>
    <p>
      This application is run inside a docker container using a base image of
      <code>ghostinspector/test-runner-node</code>. The following
      environment/cli variables are exposed as a part of the test and verified
      at build time using Ghost Inspector:
    </p>
    <ul>
      <!-- MY_ENV_VAR is provided through the application environment -->
      <li id="envVar">${envVar}</li>

      <!-- sha is provided through the command line and also sent to the suite execute API call for verification -->
      <li id="sha">${sha}</li>

      <!-- build is provided through the command line and is to test we can send more than one param using GI_PARAM_* -->
      <li id="build">${buildNumber}</li>
    </ul>
  </body>
</html>
  `); 
}).listen(8000);
console.log('Server running on port 8000.');
