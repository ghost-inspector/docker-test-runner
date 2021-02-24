var http = require('http'); 

// This is provided at runtime
const sha = process.argv[2];

http.createServer(function (req, res) { 
  res.writeHead(200, {'Content-Type': 'text/html'}); 
  res.end(`
<html>
  <body>
    <h2>Standalone image test</h2>
    <p>
      This is a standalone application that is networked to our
      <code>ghostinspector/test-runner-standalone</code> container for the
      purposes of testing. The SHA value below was passed to both containers
      for verification under test, whereas this container will display
      the SHA value on the page, and the other container will send the value
      to the Ghost Inspector test suite where they will be compared.
    </p>
    <ul>
      <li id="sha">${sha}</li>
    </ul>
  </body>
</html>
  `); 
}).listen(8000);
console.log('Server running on port 8000.');
