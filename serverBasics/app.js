const http = require("http");

const routes = require("./routes");
// here we added a './' because the routes is not a global path

// this function is called by nodejs whenever a request reaches our server

const server = http.createServer(routes);
// here we are using routes as a handler

server.listen(3000);
