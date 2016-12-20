var crypto = require('crypto');
var fs = require('fs');

/**
 * 获得内容的hash值
 *
 * @param {String} content 文件内容
 * @param {String} encoding 文件的编码，例如：'utf8' 等
 * @param {String} type hash算法，例如：'md5'、'sha1'、'sha256'、'sha512' 等
 * @returns {String}
 * @author helinjiang
 * @date   2015-11-15
 */
function getHash(content, encoding, type) {
    return crypto.createHash(type).update(content, encoding).digest('hex');
}

/**
 * 通过文件路径，获得文件的md5 hash值
 *
 * 在 win7 系统中（64位，i5-3470，12G内存）做过测试，获得 6684 张图片包括部分视频（一共27.5GB），用时为 391.5 秒。
 * 平均每秒能够处理 72 M左右的数据。
 * 运行过程中，CPU使用率没有特别大的变化，内存占用率大概会多占用500M的空间
 *
 * @param {String} filePath 文件路径
 * @returns {String}
 * @author helinjiang
 * @date   2015-11-15
 */
function getHashOfFile(filePath) {
    return getHash(fs.readFileSync(filePath), 'utf8', 'md5');
}

module.exports = {
    getHash: getHash,
    getHashOfFile: getHashOfFile
};