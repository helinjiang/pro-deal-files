var fse = require('fs-extra');
var fileSlice = require('../../common/tools/file-slice');
var ft = require("../../common/tools/file-tool");
var expect = require('chai').expect;

describe('文件重分组：5个文件，每组最多2个文件，可分成3组', function () {
    var fileArr, sliceResult;

    before(function (done) {
        // 删除临时文件目录
        fse.removeSync('./test/tmp/slice/5-2');

        // 重分组操作
        fileSlice.slice('./test/data/fixtures/slice', './test/tmp/slice/5-2', 2, {noProgressBar: true}).then(function (data) {
            fileArr = ft.getAll('./test/tmp/slice/5-2');
            sliceResult = data;
            done();
        });
    });

    after(function () {
        fse.removeSync('./test/tmp/slice/5-2');
    });

    it('文件分组操作完成', function () {
        expect(sliceResult).to.be.an('array');
    });

    it('文件分组操作操作了5个文件', function () {
        expect(sliceResult).to.have.lengthOf(5);
    });

    it('文件分组后文件和文件夹总数应该为8', function () {
        expect(fileArr).to.have.lengthOf(8);
    });

    it('文件分组后文件夹数目应该为3', function () {
        expect(fileArr.filter(function (item) {
            return item.isDirectory;
        }).length).to.be.equal(3);
    });

    it('文件分组后文件数目应该为5', function () {
        expect(fileArr.filter(function (item) {
            return !item.isDirectory;
        }).length).to.be.equal(5);
    });
});

describe('文件重分组：5个文件，每组最多3个文件，可分成2组', function () {
    var fileArr, sliceResult;

    before(function (done) {
        // 删除临时文件目录
        fse.removeSync('./test/tmp/slice/5-3');

        // 重分组操作
        fileSlice.slice('./test/data/fixtures/slice', './test/tmp/slice/5-3', 3, {noProgressBar: true}).then(function (data) {
            fileArr = ft.getAll('./test/tmp/slice/5-3');
            sliceResult = data;
            done();
        });
    });

    after(function () {
        fse.removeSync('./test/tmp/slice/5-3');
    });

    it('文件分组操作完成', function () {
        expect(sliceResult).to.be.an('array');
    });

    it('文件分组操作操作了5个文件', function () {
        expect(sliceResult).to.have.lengthOf(5);
    });

    it('文件分组后文件和文件夹总数应该为7', function () {
        expect(fileArr).to.have.lengthOf(7);
    });

    it('文件分组后文件夹数目应该为2', function () {
        expect(fileArr.filter(function (item) {
            return item.isDirectory;
        }).length).to.be.equal(2);
    });

    it('文件分组后文件数目应该为5', function () {
        expect(fileArr.filter(function (item) {
            return !item.isDirectory;
        }).length).to.be.equal(5);
    });
});
