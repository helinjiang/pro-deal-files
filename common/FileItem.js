var path = require('path');
var utils = require('./utils');

/**
 * 文件(夹)对象
 *
 * @param {String} basePath 基础路径
 * @param {String} relativePath 相对路径
 * @param {String} mode 文件模式
 * @param {String} size 文件大小
 * @param {String} mtime 文件最后修改时间
 * @param {Boolean} isDirectory 是否为目录
 *
 * @constructor
 */
function FileItem(basePath, relativePath, mode, size, mtime, isDirectory) {
    this.basePath = basePath;
    this.relativePath = relativePath;
    this.mode = mode;
    this.size = size;
    this.mtime = mtime;
    this.isDirectory = isDirectory;

    this.fileName = path.basename(this.relativePath);
    this.fullPath = path.join(this.basePath, this.relativePath);

    this._md5 = '';
}

/**
 * 获得文件的md5值
 * @return {String|*|string}
 */
FileItem.prototype.getMd5 = function () {
    // 如果当前是目录，则直接返回空即可
    if (this.isDirectory) {
        return '';
    }

    // 缓存结果，不需要每次获取都重新去计算
    if (!this._md5) {
        try {
            this._md5 = utils.getHashOfFile(this.fullPath);
        } catch (err) {
            console.error('get md5 err', this.fullPath, err);
        }
    }

    return this._md5;
};

module.exports = FileItem;