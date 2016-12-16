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

var fse = require('fs-extra');

var fileFilter = require('./common/tools/file-filter');

var result = fileFilter.filterByMd5('./test/data/fixtures/filter/same-md5');

console.log(result);