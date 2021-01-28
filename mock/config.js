const apipath = {
    REQ_PERSONS: '/persons',
    REQ_PERSON: '/person/:id',
}

module.exports.apipath = apipath;

const hostname = 'devsrv';
module.exports.config = {
    ctrlDir: './mock/controllers',
    dataDir: './mock/data',
    clientUrl: 'http://localhost:4200',
    serverUrl: 'http://' + hostname,
    serverHost: hostname,
    serverPort: '5000',
    serverUser: 'ferko',
    serverPwd: 'ferkove',
    devPort: 3000,
    mockPort: 3001,
    mockGate: {
        [apipath.REQ_PERSONS]: false,
        [apipath.REQ_PERSON]: false,
   },
}

