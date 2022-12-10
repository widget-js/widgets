const widgetPackage = require("./widgetPackage")
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', {zlib: {level: 9}});
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

class WidgetWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(
      'WidgetWebpackPlugin',
      async (
        stats /* 绑定 done 钩子后，stats 会作为参数传入。 */
      ) => {
        if (compiler.options.mode === 'production') {
          let outputPath = compiler.options.output.path;
          let widgetJSONPath = path.resolve(outputPath, "widget.json");
          widgetPackage["debugUrl"] = null;
          fs.writeFileSync(widgetJSONPath, JSON.stringify(widgetPackage, null, 2));
          // await zipDirectory(outputPath, path.join(outputPath, widgetPackage.name + ".zip"))
        }
      }
    );
  }
}

module.exports = WidgetWebpackPlugin;
