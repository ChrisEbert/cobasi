'use strict';

var fs = require('fs');
var globby = require('globby');
var ProgressBar = require('progress');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var isSvg = require('is-svg');

module.exports = function (glob, options) {
    options = options || {};

    var totalFiles = 0;
    var totalSloc = 0;
    var totalFolders = 0;

    console.log('fetching codebase...');

    var files = globby.sync(glob);

    var bar = new ProgressBar('analyzing codebase [:bar] :percent', {
        total: files.length
    });

    files.forEach(function (file) {
        var fileStats = fs.lstatSync(file);

        if (fileStats.isDirectory() === true) {
            totalFolders++;
        } else if (fileStats.isFile() === true) {
            var buffer = readChunk.sync(file, 0, 262);

            if (fileType(buffer) === null) {
                var content = fs.readFileSync(file, 'utf8') || '';

                if (isSvg(content) === false) {
                    totalSloc += content.split(/\r\n|\r|\n/).length;
                }
            }

            totalFiles++;
        }

        bar.tick();
    });

    var result = {
        files: totalFiles,
        folders: totalFolders,
        sloc: totalSloc
    };

    return JSON.stringify(result);
};
