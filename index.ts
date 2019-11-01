import * as Path from "path";
import ts2gas from "ts2gas";
import through, { TransformCallback } from "through2";

function trans() {
  return through.obj((file, _, cb) => {
    if (!file.isBuffer()) {
      return file;
    }

    const code = file.contents.toString();
    file.contents = Buffer.from(ts2gas(code));

    const relativePath = file.relative;
    const dirname = Path.dirname(relativePath),
      extname = Path.extname(relativePath),
      basename = Path.basename(relativePath, extname);

    file.path = Path.join(file.base, Path.join(dirname, basename + ".js"));

    cb(null, file);
  });
}

export { trans };
