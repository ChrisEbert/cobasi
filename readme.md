# cobasi [![Build Status](https://travis-ci.org/ChrisEbert/cobasi.svg?branch=master)](https://travis-ci.org/ChrisEbert/cobasi)

> COdeBAseSIze. Static analysis and visualization of your codebase.


## Install

```
$ npm install --save cobasi
```


## Usage

```js
var cobasi = require('cobasi');

cobasi(['./fixtures/**/*', './fixtures/**/.*']);
//{ "files" : 5, "folders" : 19 "sloc" : 2 }

```


## API

### cobasi(files)

#### files

Type: `array`

A set of files to analyze.


## License

MIT © [Chris Ebert](https://github.com/ChrisEbert)
