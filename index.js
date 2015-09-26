'use strict';

var fs = require('fs');
var globby = require('globby');

module.exports = function (glob, options) {
    options = options || {};

    var totalFiles = 0;
    var totalSloc = 0;
    var totalFolders = 0;
    var files = globby.sync(glob);

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
    });

    var result = {
        files: totalFiles,
        folders: totalFolders,
        sloc: totalSloc
    };

    return JSON.stringify(result);
};
