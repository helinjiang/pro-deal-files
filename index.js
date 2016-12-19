// var ProgressBar = require('progress');
//
// var bar = new ProgressBar('copying [:bar] :current/:total :percent(:etas) , already cost :elapseds ', {
//     complete: '=',
//     incomplete: ' ',
//     width: 20,
//     total: 50
// });
//
// var timer = setInterval(function () {
//     bar.tick(2);
//     if (bar.complete) {
//         console.log('\ncomplete\n');
//         clearInterval(timer);
//     }
// }, 100);

// var fse = require('fs-extra');
//
// var fileFilter = require('./common/tools/file-filter');
//
// var result = fileFilter.filterByMd5('./test/data/fixtures/filter/same-md5');
// // var result = fileFilter.filterByMd5('/webstormproj/seperate-files/data/new2');
//
// // console.log(result);
//
// Object.keys(result).forEach(function(md5){
//     console.log('\n');
//     console.log(md5);
//
//     var arr = result[md5];
//     arr.forEach(function(fileItem){
//         console.log(fileItem.relativePath);
//     })
// })



var fileCompare = require('./common/tools/file-compare');

var result = fileCompare.compare('./test/data/fixtures/compare/a', './test/data/fixtures/compare/b');
result.different.forEach(function(fileItem){
    console.log(fileItem.relativePath);
});
// console.log('\n');
Object.keys(result.same).forEach(function(md5){
    console.log('\n');
    console.log(md5);

    var arr = result.same[md5];
    arr.forEach(function(fileItem){
        console.log(fileItem.relativePath);
    })
});
