var fse = require('fs-extra');
var fileSlice = require('../../common/tools/file-slice');
var ft = require("../../common/tools/file-tool");
var expect = require('chai').expect;

describe('文件重分组测试：5个文件被分成3组，每组最多2个文件', function () {
    var fileArr, sliceResult;

    before(function (done) {
        // 删除临时文件目录
        fse.removeSync('./test/tmp/split');

        // 在本区块的所有测试用例之前执行
        fileSlice.slice('./test/data/fixtures/split', './test/tmp/split', 2, function (data) {
            fileArr = ft.getAll('./test/tmp/split');
            sliceResult = data;
            done();
        });
    });

    it('文件分组操作完成', function () {
        expect(sliceResult).to.be.an('object');
    });

    it('文件分组后文件和文件夹总数应该为8', function () {
        expect(fileArr.length).to.be.equal(8);
    });

    it('文件分组后文件夹数目应该为3', function () {
        expect(fileArr.filter(function (item) {
            return item.isDirectory;
        }).length).to.be.equal(3);
    });
});
