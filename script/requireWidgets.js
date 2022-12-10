const fs = require('fs');
const path = require("path");
require("ts-node").register({
  compilerOptions: {
    "module": "commonJS",
    "moduleResolution": "node",
    "preserveConstEnums": true,
    "strict": true,
    "target": "esnext",
  },
});

const fileExt = ".widget.ts";

function searchFile(currentDirPath, callback) {
  fs.readdirSync(currentDirPath, {withFileTypes: true}).forEach(function (dirent) {
    const filePath = path.join(currentDirPath, dirent.name);
    if (dirent.isFile()) {
      callback(filePath, dirent);
    } else if (dirent.isDirectory()) {
      searchFile(filePath, callback);
    }
  });
}

const widgets = [];
searchFile(path.join(process.cwd(), './src'), function (filePath, stat) {
  if (filePath.endsWith(fileExt)) {
    widgets.push(require(filePath).default)
  }
});

module.exports = widgets;
