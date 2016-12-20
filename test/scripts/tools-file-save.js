var fs = require('fs');
var fse = require('fs-extra');
var fileSave = require('../../common/tools/file-save');
var expect = require('chai').expect;

describe('文件保存：根据文件的md5值，保存一份记录在本地', function () {
    before(function () {
        fse.removeSync('./test/data/fixtures/save/md5/data.json');
        fse.removeSync('./test/data/fixtures/save/md5/data-muti.json');
    });

    after(function () {
        fse.removeSync('./test/data/fixtures/save/md5/data.json');
        fse.removeSync('./test/data/fixtures/save/md5/data-muti.json');
    });

    it('文件保存操作完成', function (done) {
        fileSave.saveJsonMd5('./test/data/fixtures/save/md5', {noProgressBar: true}).then(function(data){
            var s1 = fs.readFileSync('./test/data/fixtures/save/md5/data.json','utf8');
            // console.log(s1.replace(/[\n\r]+/gi, ' '))

            var s2 = fs.readFileSync('./test/data/expected/md5/data.json','utf8');

            expect(s1).to.equal(s2);
            done();
        });
    });
});
