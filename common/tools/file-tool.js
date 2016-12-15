/**
 * 封装的工具方法，用于文件操作。它是 fs 模块和 fs-extra 模块的补充。
 *
 * fs：https://nodejs.org/api/fs.html
 * fs-extra：https://www.npmjs.com/package/fs-extra
 *
 * @author helinjiang
 *
 */

var walkSync = require('walk-sync');
var fs = require("fs");
var fse = require('fs-extra');
var path = require("path");
var FileItem = require("../FileItem");

/**
 * 获得某路径下所有的文件和文件夹。
 *
 * https://www.npmjs.com/package/walk-sync
 *
 * @param {String} paths 路径
 * @param {Object} [options] 额外选项
 * @param {Array} [options.globs] An array of globs. Only files and directories that match at least one of the provided globs will be returned.
 * @param {Boolean} [options.directories ]  (default: true): Pass false to only return files, not directories
 * @param {Array} [options.ignore] An array of globs. Files and directories that match at least one of the provided globs will be pruned while searching.
 *
 * @return {Array} 结果，每个数组的元素为FileItem。
 */
function getAll(paths, options) {
    var result = [];

    var entry = walkSync.entries(paths, options);

    entry.forEach(function (item) {
        result.push(new FileItem(item.basePath, item.relativePath, item.mode, item.size, item.mtime, item.isDirectory()));
    });

    return result;
}

/**
 * 获得某路径下所有的文件
 * @param {String} paths 路径
 * @returns {Array}
 */
function getAllFiles(paths) {
    return getAll(paths, {directories: false});
}

// True if the file path exists.
function exists() {
    var filepath = path.join.apply(path, arguments);
    return fs.existsSync(filepath);
}

// True if the path is a directory.
function isDirectory() {
    var filepath = path.join.apply(path, arguments);
    return exists(filepath) && fs.statSync(filepath).isDirectory();
}

// True if the path is a file.
function isFile() {
    var filepath = path.join.apply(path, arguments);
    return exists(filepath) && fs.statSync(filepath).isFile();
}

module.exports = {
    getAll: getAll,
    getAllFiles: getAllFiles,
    exists: exists,
    isDirectory: isDirectory,
    isFile: isFile
};