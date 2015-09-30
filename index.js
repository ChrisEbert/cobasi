'use strict';

var fs = require('fs');
var globby = require('globby');
var ProgressBar = require('progress');

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
            var content = fs.readFileSync(file, 'utf8') || '';
            var sloc = content.split(/\r\n|\r|\n/).length;

            totalFiles++;
            totalSloc += sloc;
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
