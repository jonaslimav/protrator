const path = require('path');
var express = require('express');
var app = express();

var htmlPath = path.join(__dirname, 'views');
var cssPath = path.join(__dirname, 'bootstrap');
var jsPath = path.join(__dirname, 'script');
app.use(express.static(htmlPath));
app.use(express.static(cssPath));
app.use(express.static(jsPath));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/PROTRATOR.html");
});

var server = app.listen(8080, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});