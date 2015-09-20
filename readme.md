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
//Total Files: 4 Total Sloc: 18 Total Folders: 2

```


## API

### scany(files)

#### files

Type: `array`

A set of files to analyse.


## License

MIT © [Chris Ebert](https://github.com/ChrisEbert)
