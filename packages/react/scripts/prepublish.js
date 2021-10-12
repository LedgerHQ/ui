const path = require("path");
const fs = require("fs");

const requiredFiles = ["package.json", "README.md", "LICENSE"];
const destination = path.join(__dirname, "..", "lib");

requiredFiles.forEach((filename) => {
  const filePath = path.join(__dirname, "..", filename);
  const destPath = path.join(destination, filename);
  fs.copyFileSync(filePath, destPath);
});
