/**
 * 文件过滤。
 *
 * 最典型的场景就是我们的相片，可能保存了好几份（在同一个目录不同命名或者不同目录），我们需要将重复的过滤。
 *
 * @author helinjiang
 *
 */

var path = require('path');
var ProgressBar = require('progress');

var ft = require('./file-tool');

/**
 * 获得某路径下所有同名的重复文件信息。
 *
 * @param {String} sourcePath 路径
 * @param {Object} [options] 更多选项
 * @param {Boolean} [options.noProgressBar] 不要出现进度条
 *
 * @return {Object} 结果 {fileName: [FileItem, FileItem], fileName: [FileItem, FileItem]}
 *
 */
function filterByName(sourcePath, options) {
    return _filter(ft.getAllFiles(sourcePath), 'fileName', options);
}

/**
 * 获得某路径下所有相同文件大小的重复文件信息。
 *
 * @param {String} sourcePath 路径
 * @param {Object} [options] 更多选项
 * @param {Boolean} [options.noProgressBar] 不要出现进度条
 *
 * @return {Object} 结果 {fileName: [FileItem, FileItem], fileName: [FileItem, FileItem]}
 */
function filterBySize(sourcePath, options) {
    return _filter(ft.getAllFiles(sourcePath), 'size', options);
}

/**
 * 获得某路径下所有相同文件时间戳的重复文件信息。
 *
 * @param {String} sourcePath 路径
 * @param {Object} [options] 更多选项
 * @param {Boolean} [options.noProgressBar] 不要出现进度条
 *
 * @return {Object} 结果 {fileName: [FileItem, FileItem], fileName: [FileItem, FileItem]}
 */
function filterByTime(sourcePath, options) {
    return _filter(ft.getAllFiles(sourcePath), 'mtime', options);
}

/**
 * 获得某路径下所有相同文件MD5的重复文件信息。
 *
 * @param {String} sourcePath 路径
 * @return {Object} 结果 {fileName: [FileItem, FileItem], fileName: [FileItem, FileItem]}
 */
function filterByMd5(sourcePath, options) {
    return _filter(ft.getAllFiles(sourcePath), 'md5', options);
}

/**
 * 过滤
 * @param {Array} fileArr 文件数组
 * @param {String} filterKey 过滤项，可选项为 fileName, size, mtime, md5
 * @param {Object} [options] 更多选项
 * @param {Boolean} [options.noProgressBar] 不要出现进度条
 *
 * @return {Object} 结果 {fileName: [FileItem, FileItem], fileName: [FileItem, FileItem]}
 * @private
 */
function _filter(fileArr, filterKey, options) {
    var map = {},
        multiNameArr = [],
        result = {};

    if (['fileName', 'size', 'mtime', 'md5'].indexOf(filterKey) < 0) {
        return result;
    }

    if (!options) {
        options = {
            noProgressBar: false
        };
    }

    // 进度条
    if (!options.noProgressBar) {
        var bar = new ProgressBar('filtering [:bar] :current/:total :percent(:etas) , already cost :elapseds ', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: fileArr.length
        });
    }

    // 获取 map 和 multiNameArr
    fileArr.forEach(function (fileItem) {
        var fileName;

        if (filterKey === 'md5') {
            // 注意，如果文件比较多的话，此处每个文件做hash会比较耗时，尤其是文件也相对比较大时，情况更严重
            // 尝试过遍历包含703张图片，结果耗时189.3s图片，平均一张耗时：269ms;
            // 10M的视频400ms左右；1.55M图片126ms
            // 10M的视频290ms左右；1.55M图片50ms
            fileName = fileItem.getMd5() + '';
        } else {
            fileName = fileItem[filterKey] + '';
        }

        var arr = map[fileName];

        // 初始化
        if (!arr) {
            arr = [];
        }

        arr.push(fileItem);

        map[fileName] = arr;

        // 判断是否已经有重名的文件了
        if (arr.length > 1) {
            multiNameArr.push(fileName);
        }

        // 进度条
        if (!options.noProgressBar) {
            bar.tick();
        }
    });

    // 返回重复的文件map
    multiNameArr.forEach(function (fileName) {
        result[fileName] = map[fileName];
    });

    return result;
}

module.exports = {
    filterByName: filterByName,
    filterBySize: filterBySize,
    filterByTime: filterByTime,
    filterByMd5: filterByMd5
};