var fileFilter = require('../../common/tools/file-filter');
var expect = require('chai').expect;

describe('文件过滤：找出相同文件名的文件', function () {
    var filterResult;

    before(function () {
        filterResult = fileFilter.filterByName('./test/data/fixtures/filter/same-name');
    });

    it('文件过滤操作完成', function () {
        expect(filterResult).to.be.an('object');
    });

    it('文件过滤之后：只存在一条结果', function () {
        expect(Object.keys(filterResult)).to.have.lengthOf(1);
    });

    it('文件过滤之后：重名的文件为 unique-1.txt', function () {
        expect(filterResult).to.have.property('unique-1.txt')
            .that.is.an('array');
    });

    it('文件过滤之后：有两个文件都被命名为 unique-1.txt', function () {
        expect(filterResult['unique-1.txt']).to.have.lengthOf(2);
    });

    it('文件过滤之后：这两个文件名字相同，但路径不同', function () {
        expect(filterResult['unique-1.txt'].map(function (item) {
            return item.relativePath;
        })).to.same.members(['unique-1.txt', 'subdir/unique-1.txt']);
    });
});

describe('文件过滤：找出相同文件大小的文件', function () {
    var filterResult;

    before(function () {
        filterResult = fileFilter.filterBySize('./test/data/fixtures/filter/same-size');
    });

    it('文件过滤操作完成', function () {
        expect(filterResult).to.be.an('object');
    });

    it('文件过滤之后：只存在一条结果', function () {
        expect(Object.keys(filterResult)).to.have.lengthOf(1);
    });

    it('文件过滤之后：相同文件的文件大小为 13', function () {
        expect(filterResult).to.have.property('13')
            .that.is.an('array');
    });

    it('文件过滤之后：有两个文件的文件大小都是 13', function () {
        expect(filterResult['13']).to.have.lengthOf(2);
    });

    it('文件过滤之后：这两个文件文件大小都是13，但文件名或路径不一样', function () {
        expect(filterResult['13'].map(function (item) {
            return item.relativePath;
        })).to.same.members(['unique-size-1.txt', 'unique-size-1-same.txt']);
    });
});