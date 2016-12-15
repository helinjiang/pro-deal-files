/**
 * Created by linjianghe on 2016/12/12.
 */

var mkdirp = require('mkdirp');
var walkSync = require('walk-sync');
var fs = require("fs");
var fse = require('fs-extra');
var path = require("path");

var ft = require("./common/tools/file-tool");

console.log('==', ft.getAllFiles('./test/data'));

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