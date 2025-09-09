const { addUniversalTemplates, getTemplate } = require("../../template");

const HomePage = async (req, res) => {
  switch (req.method) {
    case "GET":
      // Prepare data for interpolation
      const templateData = {
         "head.title": "KKA equipment maintainance tracker",
        "head.description":
          "Track your equipmenent maintainance",
        "body.class": "index",
      };
      try {
        const indexStr = await getTemplate("index", templateData);
        const pageStr = await addUniversalTemplates(indexStr, templateData);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(pageStr);
      } catch (e) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("failure 500");
      }
      break;

    default:
      res.writeHead(405, { "Content-Type": "text/html" });
      res.end("handler undefined");
  }
};

module.exports = {
  HomePage,
};
