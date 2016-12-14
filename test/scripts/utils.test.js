var utils = require('../../common/utils');
var expect = require('chai').expect;

describe('文件hash测试', function() {
    it('1.txt hash 值应该为 c4ca4238a0b923820dcc509a6f75849b', function() {
        expect(utils.getHashOfFile('./test/data/fixtures/1.txt')).to.be.equal('c4ca4238a0b923820dcc509a6f75849b');
    });
});
