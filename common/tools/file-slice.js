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
var path = require("path");
var ft = require("./file-tool");

/**
 *
 * 拆分文件到不同的分组中保存。
 *
 * @param {String} sourcePath 要操作的源文件目录路径
 * @param {String} targetPath 要保存的新的文件的根目录路径
 * @param {Number} groupNum 每组多少个文件
 */
function slice(sourcePath, targetPath, groupNum) {
    var fileArr = ft.getAllFiles(sourcePath),
        length = fileArr.length,
        groupCount = Math.ceil(length / groupNum);

    console.log('Files total is ' + length + ' and should slice group count is ' + groupCount);

    for (var i = 0; i < groupCount; i++) {

        var folderName = (groupNum * i + 1) + '-' + groupNum * (i + 1);
        var curGroupFileArr = fileArr.slice(groupNum * i, groupNum * (i + 1));

        _copyTo(curGroupFileArr, path.join(targetPath, folderName));
    }
}

/**
 *
 * 将数组中的文件都拷贝到新的路径下，且维持原有的命名方式。
 *
 * @param {Array} fileArr 文件数组，数组元素为 FileItem
 * @param {String} basePath 要保存的目录路径
 * @private
 */
function _copyTo(fileArr, basePath) {
    fileArr.forEach(function (item) {
        var from = item.fullPath,
            to = path.join(basePath, item.fileName);

        console.log('Next to copy ' + from + ' to ' + to + ' ...');

        fse.copy(from, to, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('Copy ' + from + ' to ' + to + ' success!')
        });
    });
}

fse.removeSync('../../test/data/expected')
slice('../../test/data/fixtures/split', '../../test/data/expected/split', 2);