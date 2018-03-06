let subject = require('./subject.js')
let mock = require('mock-fs');
try { subject.inc(99, -77); } catch (e) {}
try { subject.inc(99, NaN); } catch (e) {}
try { subject.inc(101, -77); } catch (e) {}
try { subject.inc(101, NaN); } catch (e) {}
try { subject.weird(98, 10, 32, "mode"); } catch (e) {}
try { subject.weird(98, 10, 32, 'NEQ - mode'); } catch (e) {}
try { subject.weird(98, 10, 32, "street"); } catch (e) {}
try { subject.weird(98, 10, 32, 'NEQ - street'); } catch (e) {}
try { subject.weird(98, 10, 32, "strictly"); } catch (e) {}
try { subject.weird(98, 10, 32, 'NEQ - strictly'); } catch (e) {}
try { subject.weird(98, 10, 34, "mode"); } catch (e) {}
try { subject.weird(98, 10, 34, 'NEQ - mode'); } catch (e) {}
try { subject.weird(98, 10, 34, "street"); } catch (e) {}
try { subject.weird(98, 10, 34, 'NEQ - street'); } catch (e) {}
try { subject.weird(98, 10, 34, "strictly"); } catch (e) {}
try { subject.weird(98, 10, 34, 'NEQ - strictly'); } catch (e) {}
try { subject.weird(98, 12, 32, "mode"); } catch (e) {}
try { subject.weird(98, 12, 32, 'NEQ - mode'); } catch (e) {}
try { subject.weird(98, 12, 32, "street"); } catch (e) {}
try { subject.weird(98, 12, 32, 'NEQ - street'); } catch (e) {}
try { subject.weird(98, 12, 32, "strictly"); } catch (e) {}
try { subject.weird(98, 12, 32, 'NEQ - strictly'); } catch (e) {}
try { subject.weird(98, 12, 34, "mode"); } catch (e) {}
try { subject.weird(98, 12, 34, 'NEQ - mode'); } catch (e) {}
try { subject.weird(98, 12, 34, "street"); } catch (e) {}
try { subject.weird(98, 12, 34, 'NEQ - street'); } catch (e) {}
try { subject.weird(98, 12, 34, "strictly"); } catch (e) {}
try { subject.weird(98, 12, 34, 'NEQ - strictly'); } catch (e) {}
try { subject.weird(100, 10, 32, "mode"); } catch (e) {}
try { subject.weird(100, 10, 32, 'NEQ - mode'); } catch (e) {}
try { subject.weird(100, 10, 32, "street"); } catch (e) {}
try { subject.weird(100, 10, 32, 'NEQ - street'); } catch (e) {}
try { subject.weird(100, 10, 32, "strictly"); } catch (e) {}
try { subject.weird(100, 10, 32, 'NEQ - strictly'); } catch (e) {}
try { subject.weird(100, 10, 34, "mode"); } catch (e) {}
try { subject.weird(100, 10, 34, 'NEQ - mode'); } catch (e) {}
try { subject.weird(100, 10, 34, "street"); } catch (e) {}
try { subject.weird(100, 10, 34, 'NEQ - street'); } catch (e) {}
try { subject.weird(100, 10, 34, "strictly"); } catch (e) {}
try { subject.weird(100, 10, 34, 'NEQ - strictly'); } catch (e) {}
try { subject.weird(100, 12, 32, "mode"); } catch (e) {}
try { subject.weird(100, 12, 32, 'NEQ - mode'); } catch (e) {}
try { subject.weird(100, 12, 32, "street"); } catch (e) {}
try { subject.weird(100, 12, 32, 'NEQ - street'); } catch (e) {}
try { subject.weird(100, 12, 32, "strictly"); } catch (e) {}
try { subject.weird(100, 12, 32, 'NEQ - strictly'); } catch (e) {}
try { subject.weird(100, 12, 34, "mode"); } catch (e) {}
try { subject.weird(100, 12, 34, 'NEQ - mode'); } catch (e) {}
try { subject.weird(100, 12, 34, "street"); } catch (e) {}
try { subject.weird(100, 12, 34, 'NEQ - street'); } catch (e) {}
try { subject.weird(100, 12, 34, "strictly"); } catch (e) {}
try { subject.weird(100, 12, 34, 'NEQ - strictly'); } catch (e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('emptyDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('emptyDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('emptyDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('emptyDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('emptyDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('emptyDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('emptyDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('emptyDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('emptyDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('emptyDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('emptyDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('emptyDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('emptyDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('emptyDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('emptyDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('emptyDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('emptyDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('emptyDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('emptyDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('emptyDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('nonEmptyDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('nonEmptyDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('nonEmptyDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('nonEmptyDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('nonEmptyDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('nonEmptyDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('nonEmptyDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('nonEmptyDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('nonEmptyDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('nonEmptyDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('nonEmptyDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('nonEmptyDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('nonEmptyDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('nonEmptyDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('nonEmptyDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('nonEmptyDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('nonEmptyDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('nonEmptyDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('nonEmptyDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('nonEmptyDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('file', './');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('file', './');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('file', './');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('file', './');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('file', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('file', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('file', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('file', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('file', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('file', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('file', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('file', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('file', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('file', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('file', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('file', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('file', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('file', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('file', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('file', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/file1', './');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/file1', './');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('pathContent/file1', './');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('pathContent/file1', './');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/file1', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/file1', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('pathContent/file1', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('pathContent/file1', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/file1', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/file1', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('pathContent/file1', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('pathContent/file1', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/file1', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/file1', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('pathContent/file1', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('pathContent/file1', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/file1', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/file1', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('pathContent/file1', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('pathContent/file1', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/someDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/someDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('pathContent/someDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('pathContent/someDir', './');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/someDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/someDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('pathContent/someDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('pathContent/someDir', './dsdsd');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/someDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/someDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('pathContent/someDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('pathContent/someDir', 'emptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/someDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/someDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('pathContent/someDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('pathContent/someDir', 'nonEmptyDir');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file(),pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/someDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({pathContent:{file1:new Buffer('abc'),someDir:mock.directory()}});
		subject.fileTest('pathContent/someDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({emptyDir:mock.directory(),nonEmptyDir:mock.directory({ items: { file: mock.file() } }),file:mock.file()});
		subject.fileTest('pathContent/someDir', 'file');
	mock.restore();
} catch(e) {}
try{
	mock({});
		subject.fileTest('pathContent/someDir', 'file');
	mock.restore();
} catch(e) {}
try { subject.normalize(''); } catch (e) {}
try { subject.format('', '', true); } catch (e) {}
try { subject.format('', '', false); } catch (e) {}
try { subject.format('', '', {strongbow: true}); } catch (e) {}
try { subject.format('', '', {strongbow: false}); } catch (e) {}
try { subject.blackListNumber("2124415092"); } catch (e) {}
try { subject.blackListNumber("(468) 124-3223"); } catch (e) {}
