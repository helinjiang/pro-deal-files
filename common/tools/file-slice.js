/**
 * 将文件按一定数量进行分组并重新保存。
 *
 * 比如我们在使用 https://tinypng.com/ 来压缩图片时，被限制每次最多 20 张图片，如果我们有 100 张图片需要去压缩，则必须要上传5次；
 * 使用本模块中的方法，就可以先把 100 张图片分成 5 组，然后再去上传。
 *
 * @author helinjiang
 *
 */

var fse = require('fs-extra');
var path = require('path');
var ft = require('./file-tool');
var _ = require('lodash');

function Checker(fileArr) {
    this.fileArr = fileArr;
    this.failList = [];
    this.checked = 0;
}

Checker.prototype.addFailItem = function (fileItem, err) {
    this.failList.push(_.assign({
        copyErr: err
    }, fileItem));
};

Checker.prototype.record = function () {
    this.checked++;
};

Checker.prototype.isComplete = function () {
    return this.fileArr.length === this.checked;
};

Checker.prototype.isSuccess = function () {
    return !this.failList.length;
};

Checker.prototype.getFailList = function () {
    return this.failList;
};

/**
 *
 * 拆分文件到不同的分组中保存，并且保持时间戳不变。
 *
 * TODO 考虑使用 Promise 方式来判断数个异步是否完成
 *
 * @param {String} sourcePath 要操作的源文件目录路径
 * @param {String} destPath 要保存的新的文件的根目录路径
 * @param {Number} groupNum 每组多少个文件
 * @param {Function} callback 回调，传入一个对象 {isSuccess: Boolean, failList: Array}
 */
function slice(sourcePath, destPath, groupNum, callback) {
    var fileArr = ft.getAllFiles(sourcePath),
        length = fileArr.length,
        groupCount = Math.ceil(length / groupNum),
        checker = new Checker(fileArr);

    if (typeof callback !== 'function') {
        callback = function (data) {
        };
    }

    // console.log('Files total is ' + length + ' and should slice group count is ' + groupCount);

    for (var i = 0; i < groupCount; i++) {
        var folderName = (groupNum * i + 1) + '-' + groupNum * (i + 1);
        var savePath = path.join(destPath, folderName);
        var curGroupFileArr = fileArr.slice(groupNum * i, groupNum * (i + 1));

        // 循环一个一个文件拷贝
        curGroupFileArr.forEach(function (item) {
            var from = item.fullPath,
                to = path.join(savePath, item.fileName);

            // console.log('Next to copy ' + from + ' to ' + to + ' ...');

            // https://www.npmjs.com/package/fs-extra#copy
            fse.copy(from, to, {preserveTimestamps: true}, function (err) {
                checker.record();

                if (err) {
                    checker.addFailItem(item, err);

                    if (checker.isComplete()) {
                        callback({
                            isSuccess: checker.isSuccess(),
                            failList: checker.getFailList()
                        })
                    }

                    return console.error(err);
                }

                if (checker.isComplete()) {
                    callback({
                        isSuccess: checker.isSuccess(),
                        failList: checker.getFailList()
                    })
                }
                // console.log('Copy ' + from + ' to ' + to + ' success!')
            });
        });
    }
}

module.exports = {
    slice: slice
};
