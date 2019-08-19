const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>send</button></form></body>"
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
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end;
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my node.js!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;

// sometimes we do need to export many functions so we can do it like thi
/*
module.exports = {
    handler: requestHandler,
    someText = 'Hard coded text'
};

and similarly in app.js we would access routes object as routes.handler or routes.someText
*/

/* 
we can also do it like
module.exports.handler = requestHandler;

and also

exports.handler = requestHandler;
exports.someText = 'Hard coded text';

*/
