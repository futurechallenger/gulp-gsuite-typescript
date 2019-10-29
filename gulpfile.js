const { src, dest } = require("gulp");
const ts2gas = require("ts2gas");
const through2 = require("through2");
const rename = require("gulp-rename");

function transCode() {
  return through2.obj((file, _, cb) => {
    if (!file.isBuffer()) {
      return file;
    }

    const code = file.contents.toString();
    file.contents = Buffer.from(ts2gas(code));

    cb(null, file);
  });
}

function build(cb) {
  src("src/**/*.*", {base: "./src"})
    .pipe(transCode())
    .pipe(
      rename(path => {
        if (path.extname === ".ts") path.extname = ".js";
      })
    )
    .pipe(dest(".build"));
  cb();
}

exports.build = build;
