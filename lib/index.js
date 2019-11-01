"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Path = __importStar(require("path"));
var ts2gas_1 = __importDefault(require("ts2gas"));
var through2_1 = __importDefault(require("through2"));
function trans() {
    return through2_1.default.obj(function (file, _, cb) {
        if (!file.isBuffer()) {
            return file;
        }
        var code = file.contents.toString();
        file.contents = Buffer.from(ts2gas_1.default(code));
        var relativePath = file.relative;
        var dirname = Path.dirname(relativePath), extname = Path.extname(relativePath), basename = Path.basename(relativePath, extname);
        file.path = Path.join(file.base, Path.join(dirname, basename + ".js"));
        cb(null, file);
    });
}
exports.trans = trans;
