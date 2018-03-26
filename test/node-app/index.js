var http = require('http'); 

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
      <li id="envVar">${process.env.MY_ENV_VAR}</li>

      <!-- sha is provided through the command line and also sent to the suite execute API call for verification -->
      <li id="sha">${process.argv[3]}</li>

      <!-- build is provided through the command line and is to test we can send more than one param to the API (tests the URL format 'foo=bar&wizards=awesome') -->
      <li id="build">${process.argv[4]}</li>
    </ul>
  </body>
</html>
  `); 
}).listen(8000);
console.log('Server running on port 8000.');
