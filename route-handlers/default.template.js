import { getTemplate } from "../template";

const DefaultTemplate = (req, res) => {
  switch (req.method) {
    case "GET":
      // Prepare data for interpolation
      const templateData = {
        "head.title": "Uptime Monitoring - Made Simple",
        "head.description":
          "We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we'll send you a text to let you know",
        "body.class": "index",
      };

      // Read in a template as a string
      getTemplate("index", templateData, function (err, str) {
        if (!err && str) {
          // Add the universal header and footer
          if (!err && str) {
            // Return that page as HTML
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(str);
            // callback(200, str, "html");
          } else {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("failure 500");
            // callback(500, undefined, "html");
          }
        } else {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("failure 500");
          // callback(500, undefined, "html");
        }
      });
      return;

    default:
      res.writeHead(405, { "Content-Type": "text/html" });
      res.end(message);
      // callback(405, undefined, "html");
      return;
  }
};

module.exports = {
  DefaultTemplate
}
