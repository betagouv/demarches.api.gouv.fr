var fs = require("fs");

function readFilesSync(dirname) {
  const filenames = fs.readdirSync(dirname, "utf8");
  return filenames.reduce((data, filename) => {
    if (filename !== "index.js") {
      const slug = filename.replace(".json", "");
      const content = fs.readFileSync(dirname + filename, {
        encoding: "utf8",
        flag: "r",
      });
      data[slug] = JSON.parse(content);
    }

    return data;
  }, {});
}

const data = readFilesSync("./demarches/");

module.exports = data;
