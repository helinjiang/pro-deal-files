# pro-deal-files

处理文件相关的一些操作实践，不一定很通用化，但是里面的代码都很有参考价值。

## 工具集

说是工具集，但是并没有真正的封装好，所以没有放到 npm 上。但是这些代码还是很有参考意义的，针对不同的目的做了一层浅封装。

- file-tool.js，一些公共的文件操作
- file-slice.js，用于将文件分隔成指定大小集合的数个子文件夹
- file-save.js，以某种方式遍历之后，保存信息在本地
- file-filter.js，过滤出某个路径下的重复文件
- file-compare.js，比较两个文件夹内重复或不重复的文件

## 测试用例

处于学习的目的，本项目还涉及到了测试，测试用例在 `test` 目录下，使用的是 [mocha](http://mochajs.org/) 这个测试框架，并使用了 [chai](http://chaijs.com/) 这个断言库，且使用了 [Expect](http://chaijs.com/api/bdd/) 方式来使用。

在使用测试用例之前，首先要在全局安装 mocha：`npm install -g mocha`。

如果已经安装过，则在项目根目录中运行： `mocha` 或 `npm test`。

## demo

每一个 demo 都是一种类型的操作，可用于实现具体的功能。

- 01-get-all-file-md5，遍历某个路径，生成遍历树，并按md5值来过滤出重复的文件。