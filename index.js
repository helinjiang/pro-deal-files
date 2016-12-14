/**
 * Created by linjianghe on 2016/12/12.
 */

var mkdirp = require('mkdirp');
var walkSync = require('walk-sync');
var fs = require("fs");
var fse = require('fs-extra');
var path = require("path");

var utils = require('./common/utils');
var r = utils.getHashOfFile('./test/data/fixtures/1.txt');
console.log('--',r)
/**
 * 文件对象
 * TODO 考虑是否要加入mode权限
 * @param {String} basePath 基础路径
 * @param {String} relativePath 相对路径
 * @param {String} size 文件大小
 * @param {String} mtime 文件最后修改时间
 * @constructor
 */
function FileItem(basePath, relativePath, size, mtime) {
    this.basePath = basePath;
    this.relativePath = relativePath;
    this.size = size;
    this.mtime = mtime;

    this.fileName = path.basename(this.relativePath);
    this.fullPath = path.join(this.basePath, this.relativePath);
    this.md5 = '';
}

/**
 * 获得某路径下所有的文件。
 * @param {String} paths 路径
 * @return {Array} 结果，每个数组的元素为FileItem。
 */
function getAllFile(paths) {
    var entry = walkSync.entries(paths, {directories: false});

    var result = [];
    entry.forEach(function (item) {
        var fileItem = new FileItem(item.basePath, item.relativePath, item.size, item.mtime);
        result.push(fileItem);
    });

    return result;
}

function test() {

    var result = getAllFile('./data/init'),
        length = result.length,
        groupNum = 20,
        groupCount = parseInt(length / groupNum) + 1;

    console.log(length, groupCount);
    // groupCount = 3
    for (var i = 0; i < groupCount; i++) {

        var folderName = (groupNum * i + 1) + '-' + groupNum * (i + 1);
        console.log(folderName);

        var curResult = result.slice(groupNum * i, groupNum * (i + 1));

        copyTo(curResult, './data/new/' + folderName)

    }

    // for (var i = 0; i < length; i++) {
    //     if (i > 0 && i % 20 == 0) {
    //         console.log('---', i, i - 20 + 1, i);
    //     }
    // }

    // mkdirp('./data', function (err) {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         console.log('pow!');
    //     }
    // });

}

function copyTo(arr, path) {
    mkdirp(path, function (err) {
        console.log('============path================', path);
        if (err) {
            console.error(err);
        } else {
            arr.forEach(function (item) {
                fse.copy('./data/init/' + item.fileName, path + '/' + item.fileName, function (err) {
                    if (err) {
                        return console.error(err)
                    }
                    console.log(item.fileName + " success!")
                });
            });
        }
    });
}

// test();

// fse.copy('./data/init/BX0109H080-4.jpg', './data/new/2221-2240/BX0109H080-4.jpg', function (err) {
//     if (err) {
//         return console.error(err)
//     }
//     console.log("BX0109H080-4.jpg success!")
// });