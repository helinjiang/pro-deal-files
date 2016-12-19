/**
 * 文件比较。
 *
 * 最典型的场景就是我们的相片，可能在不同文件夹里面保存了，我们要合并，同时去除重复的。
 *
 * 方法一：比较文件的 md5 值。这个是最准确的，也是耗时最多的方法，适合要精准比较的场景。
 * 方法二：如果文件同名，且文件大小一致，则可能为同一个文件（最后修改时间也许不一样）。
 * 这种方法适合比较有规律的场景，比如找出两个文件夹下的重复相片，但无法找出同样文件但文件名不一样（文件重命名）的场景。
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
 * 以 pathA 为基准，不在 pathA 但在 pathB 中的文件列表。
 *
 * @param {String} pathA 基准路径
 * @param {String} pathB 待比较路径
 * @param {Object} [options] 更多选项
 * @param {Boolean} [options.noProgressBar] 不要出现进度条
 *
 * @return {Object}
 */
function compare(pathA, pathB, options) {
    var pathAFiles = ft.getAllFiles(pathA),
        pathBFiles = ft.getAllFiles(pathB);

    if (!options) {
        options = {
            noProgressBar: false
        };
    }

    // 进度条
    if (!options.noProgressBar) {
        var bar = new ProgressBar('compare [:bar] :current/:total :percent(:etas) , already cost :elapseds ', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: pathBFiles.length
        });
    }

    var arrInBButNotInA = [];
    var arrInBoth = {};

    pathBFiles.forEach(function (fileItemB) {
        var md5B = fileItemB.getMd5(),
            isInBoth = false;

        for (var i = 0, length = pathAFiles.length; i < length; i++) {
            var fileItemA = pathAFiles[i],
                md5A = fileItemA.getMd5();

            // 如果找到了相同的，则停止
            if (md5A == md5B) {
                isInBoth = true;
                break;
            }
        }

        if (!isInBoth) {
            arrInBButNotInA.push(fileItemB);
        } else {
            var arr = arrInBoth[md5A];
            if (!arr) {
                arr = [];
                arr.push(fileItemA);
            }

            arr.push(fileItemB);

            arr.sort(function (item1, item2) {
                return item1.fullPath > item2.fullPath;
            });

            arrInBoth[md5A] = arr;
        }

        // 进度条
        if (!options.noProgressBar) {
            bar.tick();
        }
    });

    return {
        different: arrInBButNotInA,
        same: arrInBoth
    };
}

module.exports = {
    compare: compare
};