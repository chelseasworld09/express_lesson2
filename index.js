const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();
const hostname = "localhost";

const handlebars = require("express-handlebars");

const port = 3000;

serverStaticFile = (response, path, contentType, responseCode) => {
  if (!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("500 - Internal Error");
    } else {
      response.writeHead(responseCode, { "Content-Type": contentType });
      response.end(data);
    }
  });
};

const server = http.createServer((request, response) => {
  let path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
  switch (path) {
    case "":
      serverStaticFile(response, "public/home.html", "text/html");
      break;
    case "/about":
      serverStaticFile(response, "public/about.html", "text/html");
      break;
    default:
      serverStaticFile(response, "public/404.html", "text/html", 404);
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(
    `Server started on http://${hostname}:${port}/; press Ctrl-C to terminate....`
  );
});
app.set("port", process.env.PORT || 3000);
app.get("/home", (request, response) => {
  response.type("text/plain");
  response.send("./public/index.html");
});

app.get("/", (request, response) => {
  response.render("home");
});

app.get("about", (request, response) => {
  response.render("about");
});

app.use((request, response) => {
  response.status(404);
  response.render("404");
});
app.listen(app.get("port"), () => {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
