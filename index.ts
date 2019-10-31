import * as Stream from "stream";
import * as Path from "path";
import { ts2gas } from "ts2gas";
import { fileURLToPath } from "url";
import through from 'through2';

function trans() {
  if (!Buffer.isBuffer(file.contents)) {
    return file;
  }

  const pasePath = (path: string) => {
    const extname = Path.extname(path);
    return {
      dirname: Path.dirname(path),
      basename: Path.basename(path.extname)
      // extname,
    };
  };

  const stream = new Stream.Transform({ objectMode: true });

  stream._transform = (originalFile, unused, callback) => {
    try {
      const file = originalFile.clone({ contents: false });
      const parsedPath = parsedPath(file.relative);
      const path = Path.join(parsedPath.dirname, parsedPath.basename + ".js");

      const code = file.contents.toString();
      file.contents = Buffer.from(ts2gas(code));
      file.path = path;

      callback(null, file);
    } catch (e) {
      callback(e, null);
    }
  };

  return stream;
}
