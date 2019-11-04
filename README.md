# gulp-gsuite-typescript

<a href="https://www.npmjs.com/package/gulp-gsuite-typescript"><img src="https://img.shields.io/npm/v/gulp-gsuite-typescript.svg" alt="npm Version"></a>

A [gulp](https://gulpjs.com/) plugin to make google apps script project works as a normal typescript project.

If you want to develop GSuite Addon Apps with typescript, `gulp` & `gulp-gsuite-typescript` can help you out with all typescript feature enabled.

## Install
```
yarn add gulp-gsuite-typescript -D
```

## How it works

1. Transpile typescript files one by one with `ts2gas` the tool from Google.
2. Rename `.ts` ext to `.js`.

## Usage
```
const { src, dest } = require('gulp');
const { trans } = require('gulp-gsuite-typescript');

function build(cb) {
  src('src/**/*.*', { base: './src' })
    .pipe(trans())
    .pipe(dest('./built'));
  cb();
}

exports.build = build;
```

## Notes
When there're consts or variables you want to export, the export statement have to be written like `export { CONST_1, CONST_2 };`.

Here's why:

```typescript
const REQUEST_HOST = 'https://www.someapi.com';
const const REQUEST_VERSION = '1.0';

export { Utils, REQUEST_HOST };
```
After it's transpiled:
```js
// Compiled using ts2gas 3.4.4 (TypeScript 3.6.4)
var exports = exports || {};
var module = module || { exports: exports };
var REQUEST_HOST = 'https://www.someapi.com';
exports.REQUEST_HOST = REQUEST_HOST;
exports.REQUEST_VERSION = '1.0';
```
After transpiled `REQUEST_HOST` has `var REQUEST_HOST = 'https://www.someapi.com'` and `exports.REQUEST_HOST = REQUEST_HOST;`. But `REQUEST_VERSION` has only `exports.REQUEST_VERSION = 1.0;`. 

There's no way that `REQUEST_VERSION` can be found in a globle scope in GSuite addon app.


## License

[MIT](./LICENSE)