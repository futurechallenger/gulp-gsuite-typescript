// const Path = require("path");
const { src, dest } = require("gulp");
const {trans} = require('../lib');
// const ts2gas = require("ts2gas");
// const through2 = require("through2");

// function transCode() {
//   return through2.obj((file, _, cb) => {
//     if (!file.isBuffer()) {
//       return file;
//     }

//     const code = file.contents.toString();
//     file.contents = Buffer.from(ts2gas(code));

//     const relativePath = file.relative;
//     const dirname = Path.dirname(relativePath),
//       extname = Path.extname(relativePath),
//       basename = Path.basename(relativePath, extname);

//     file.path = Path.join(file.base, Path.join(dirname, basename + ".js"));

//     cb(null, file);
//   });
// }

function build(cb) {
  src("src/**/*.*", { base: "./src" })
    .pipe(trans())
    .pipe(dest("./built"));
  cb();
}

exports.build = build;
