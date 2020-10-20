const express = require("express");
const demarches = require("./demarches/index.js");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.json(demarches);
});

app.get("/:apiSlug", function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  const slug = req.params.apiSlug;

  if (!demarches[slug]) {
    res.statusCode = 404;
    res.send({ Error: "No demarche was found for this api" });
  }
  res.json(demarches[slug]);
});

app.get("/:apiSlug/:demarcheId", function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  const slug = req.params.apiSlug;
  const demarcheId = req.params.demarcheId;

  if (!demarches[slug][demarcheId]) {
    res.statusCode = 404;
    res.send({ Error: "This demarche was not found for this api" });
  }

  res.writeHead(302, {
    Location: demarches[slug][demarcheId].path,
  });
  res.end();
});

app.listen(port, () => {
  console.log(`Zoum zoum zoum, this service is live !`);
});
