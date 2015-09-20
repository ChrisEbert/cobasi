'use strict';

var map = require('map-stream');
var gfs = require('vinyl-fs');
var fs = require('fs');
var sloc = require('sloc');
var path = require('path');


module.exports = function (glob, options) {

    options = options || {};

    var totalFiles = 0;
    var totalSloc = 0;
    var totalFolders = 0;

    var log = function(file, cb) {

        var fileStats = fs.lstatSync(file.path);

        if(fileStats.isDirectory() === true) {
            totalFolders++;
        }
        else if(fileStats.isFile() === true) {

            var content = '',
                extension = path.extname(file.path);

            if (file.contents) {
                content = file.contents.toString('utf8');
            }

            var slocStats = {};

            try {
                slocStats = sloc(content, extension);
            }
            catch(e) {
                slocStats.total = content.split(/\r\n|\r|\n/).length;
            }

            totalFiles++;
            totalSloc += slocStats.total;

        }

        cb(null, file);
    };

    var done = function() {

        console.log('Total Files: ' + totalFiles);
        console.log('Total Sloc: ' + totalSloc);
        console.log('Total Folders: ' + totalFolders);
    };

    gfs.src(glob)
        .pipe(map(log))
        .on('end', done);
};
