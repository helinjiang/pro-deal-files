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

var fileSlice = require('./common/tools/file-slice');

fse.removeSync('./test/tmp/split');

fileSlice.slice2('./test/data/fixtures/split', './test/tmp/split', 2).then(function(){
    console.log('end');
});

// fileSlice.slice2('/webstormproj/seperate-files/data/init', '/webstormproj/seperate-files/data/new', 20).then(function(){
//     console.log('end');
// });


// fileSlice.slice2('./test/data/fixtures/split', './test/tmp/split', 3);