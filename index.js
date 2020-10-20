const express = require("express");
const demarches = require("./demarches/index.js");
const app = express();
const port = process.env.PORT || 8000;

const notFound = (msg, request, response) => {
  console.log(`[404] ${request.path}`);
  response.statusCode = 404;
  response.send({ Error: msg });
  response.end();
};

app.get("/", (req, res) => {
  res.json(demarches);
});

app.get("/:apiSlug", function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  const slug = req.params.apiSlug;

  if (!demarches[slug]) {
    notFound("No demarche was found for this api", req, res);
    return;
  }
  res.json(demarches[slug]);
});

app.get("/:apiSlug/:demarcheId", function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  const slug = req.params.apiSlug;
  const demarcheId = req.params.demarcheId;

  if (!demarches[slug]) {
    notFound("No demarche was found for this api", req, res);
    return;
  }

  if (!demarches[slug][demarcheId]) {
    notFound("This demarche was not found for this api", req, res);
    return;
  }

  res.writeHead(302, {
    Location: demarches[slug][demarcheId].path,
  });
  res.end();
});

app.listen(port, () => {
  console.log(`Zoum zoum zoum, this service is live !`);
});
