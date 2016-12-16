/**
 * 将文件按一定数量进行分组并重新保存。
 *
 * 比如我们在使用 https://tinypng.com/ 来压缩图片时，被限制每次最多 20 张图片，如果我们有 100 张图片需要去压缩，则必须要上传5次；
 * 使用本模块中的方法，就可以先把 100 张图片分成 5 组，然后再去上传。
 *
 * @author helinjiang
 *
 */

var path = require('path');
var _ = require('lodash');
var Promise = require('bluebird');
var fse = Promise.promisifyAll(require('fs-extra'));
var ProgressBar = require('progress');

var ft = require('./file-tool');

/**
 *
 * 拆分文件到不同的分组中保存，并且保持时间戳不变。
 *
 * @param {String} sourcePath 要操作的源文件目录路径
 * @param {String} destPath 要保存的新的文件的根目录路径
 * @param {Number} groupNum 每组多少个文件
 * @param {Object} [options] 更多选项
 * @param {Boolean} [options.noProgressBar] 不要出现进度条
 * @return {Promise}
 */
function slice(sourcePath, destPath, groupNum, options) {
    var fileArr = ft.getAllFiles(sourcePath),
        length = fileArr.length,
        groupCount = Math.ceil(length / groupNum),
        copyFiles = [];

    if (!options) {
        options = {
            noProgressBar: false
        };
    }

    // console.log('Files total is ' + length + ' and should slice group count is ' + groupCount);

    // 进度条
    if (!options.noProgressBar) {
        var bar = new ProgressBar('copying [:bar] :current/:total :percent(:etas) , already cost :elapseds ', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: length
        });
    }

    for (var i = 0; i < groupCount; i++) {
        var curLimit = groupNum * (i + 1);
        var folderName = (groupNum * i + 1) + '-' + (length > curLimit ? curLimit : length);
        var savePath = path.join(destPath, folderName);
        var curGroupFileArr = fileArr.slice(groupNum * i, groupNum * (i + 1));

        // 循环一个一个文件拷贝
        curGroupFileArr.forEach(function (item) {
            var from = item.fullPath,
                to = path.join(savePath, item.fileName);

            // console.log('Next to copy ' + from + ' to ' + to + ' ...');

            // https://www.npmjs.com/package/fs-extra#copy
            copyFiles.push(fse.copyAsync(from, to, {preserveTimestamps: true}).then(function () {
                if (!options.noProgressBar) {
                    bar.tick();
                }
                return _.assign({}, item);
            }).catch(function (err) {
                if (!options.noProgressBar) {
                    bar.tick();
                }
                return _.assign({
                    copyErr: err
                }, item);
            }));
        });
    }

    return Promise.all(copyFiles);
}

module.exports = {
    slice: slice
};
