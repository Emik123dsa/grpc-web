const http = require("http");

const handleRequest = (req, res, next) => {
  res.writeHead(200);
  res.end(null);
};

const server = http.createServer(handleRequest);
server.listen(4200);
