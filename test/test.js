'use strict';

var assert = require('assert');
var cobasi = require('./../index');
var expectedResult = {
    files: 5,
    sloc: 19,
    folders: 2
};

describe('cobasi', function () {
    it('should return JSON', function () {
        var result = cobasi(['./test/fixtures/**/*', './test/fixtures/**/.*']);

        assert.strictEqual(typeof result, 'string');

        assert.deepEqual(JSON.parse(result), expectedResult);
    });

    it('should count correctly', function () {
        var result = JSON.parse(cobasi(['./test/fixtures/**/*', './test/fixtures/**/.*']));

        assert.strictEqual(result.files, expectedResult.files);
        assert.strictEqual(result.sloc, expectedResult.sloc);
        assert.strictEqual(result.folders, expectedResult.folders);
    });
});

