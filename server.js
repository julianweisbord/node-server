var http = require("http");
var fs = require("fs");
var mime = require('mime');
function send404Response(response){
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("Error 404 page not found");
  response.end();

}

function onRequest(request, response){
  if(request.url == '/') {
    request.url += "index.html"
  }
  request.url = "." + request.url
  console.log(request.url);
  fs.stat(request.url, function(err, exists) {
    if(err){
      send404Response(response);
    }
    else{
      response.writeHead(200, {"Content-Type": mime.lookup(request.url)});
      fs.createReadStream(request.url).pipe(response);
    }
  })

}

http.createServer(onRequest).listen(8888);
console.log("The server has started, Julian");
