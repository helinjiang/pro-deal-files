/**
 * 获得所有文件的md5值，并且保存在json文件中
 */

var path = require('path');
var Promise = require('bluebird');
var fse = Promise.promisifyAll(require('fs-extra'));

var fileSave = require('../../common/tools/file-save');

// var sourcePath = '/webstormproj/seperate-files/data/new2';
var sourcePath = '../../test/data/fixtures/save/md5';

var resultPath = path.join(sourcePath, 'data-muti.json');

fileSave.saveJsonMd5(sourcePath).then(function (data) {
    console.log('文件遍历完毕');

    var map = data.map;
    var multiArr = data.multiArr;

    if (!multiArr.length) {
        console.log('无重复文件')
    } else {
        var resultMap = {};
        multiArr.forEach(function (md5) {
            var arr = map[md5];

            resultMap[md5] = arr.map(function (item) {
                return item.p;
            });
        });

        fse.outputJsonAsync(resultPath, resultMap).then(function () {
            console.log('已找出所有重复文件');
        });
    }
}).catch(function (err) {
    console.log('文件遍历时出错', err);
});
