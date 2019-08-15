// require is used to import files in nodejs, it either takes path to a file or a core module. In this case the module is http. It automatically adds js to the end
const http = require("http");
const fs = require("fs");

// this function contains two arguments- request and response

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type ='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
    });
    // on allows us to listen to certain events
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Page rendered from nodejs</title></head>");
  res.write("<body><h1>Server here!</h1></body>");
  res.write("</html>");
  res.end();
  //   we can not add res.write after we have called res.end it will lead to an error
});

// this function is called by nodejs whenevera  request reaches our server

server.listen(3000);
