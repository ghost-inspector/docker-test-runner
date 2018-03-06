/**
 * Just a simple app to test the base-image Dockerfile to ensure that the
 * environment variables and param passing are working.
 */
var http = require('http'); 

http.createServer(function (req, res) { 
  res.writeHead(200, {'Content-Type': 'text/html'}); 
  res.end(`
<html>
  <body>
    <ul>
      <li id="envVar">${process.env.MY_ENV_VAR}</li>
      <li id="cliVar">${process.argv.pop()}</li>
    </ul>
  </body>
</html>
  `); 
}).listen(8000);
console.log('Server running on port 8000.');
