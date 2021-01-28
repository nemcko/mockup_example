var path = require('path');
var mocksrv = require(path.join(__dirname, './node_modules/mockprosrv'));
mocksrv.runMockSrv(__dirname, path.join(__dirname, './mock/config'));
