const http = require("http");
const { Routers } = require("./router");
const { HomeTemplate } = require("./route-handlers/home.template.js");
const { HomeAssets } = require("./route-handlers/home.assets.js");

Routers.register("client", HomeAssets).register('/', HomeTemplate);

/**
 * Handles incoming HTTP requests and sends a response.
 * @param {http.IncomingMessage} req - The incoming request object.
 * @param {http.ServerResponse} res - The server response object.
 */
const process = function (req, res) {
  Routers.check(req.url, [req, res]);
};

// Instantiate the HTTP server
const server = http.createServer(process).listen(3300, function () {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "The HTTP server is running on port " + 3300
  );
});
