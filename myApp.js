const express = require("express");
const app = express();

const helmet = require("helmet");
app.use(helmet.hidePoweredBy());

// Apply helmet.frameguard() on each request with the configuration object
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());

// Exporting 'app' for potential use in other files
module.exports = app;

const api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
