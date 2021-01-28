'use strict';
module.exports = function (app, lib, conf, api) {
    app.post(api.REQ_PERSONS, (req, res) => {
        lib.useDb(conf, 'db1').then(db => {
            lib.browseList(req, res, db, 'persons', 'id,name,gender,company,age', {
                // mapping filter fields to database fields
                search: 'name',
            }, (req, res, result) => {
                let arr = []
                result.result.forEach(item => {
                    arr.push({
                        // mapping database fields to response fields
                        id: item.id,
                        name: item.name,
                        age: item.age,
                        gender: item.gender,
                        company: item.company
                    })
                })
                result.result = arr;
                res.send(result);
            });
        });
    })

    app.post(api.REQ_PERSON, (req, res) => {
        lib.useDb(conf, 'db1').then(db => {
            req.body.id = new Date().getTime();
            lib.appendObject(req, res, db, 'persons');
        });
    })

    app.get(api.REQ_PERSON, (req, res) => {
        lib.useDb(conf, 'db1').then(db => {
            lib.sendObjectById(req, res, db, 'persons');
        });
    })

    app.put(api.REQ_PERSON, (req, res) => {
        lib.useDb(conf, 'db1').then(db => {
            lib.saveObjectById(req, res, db, 'persons');
        });
    })

    app.delete(api.REQ_PERSON, (req, res) => {
        lib.useDb(conf, 'db1').then(db => {
            lib.deleteObjectById(req, res, db, 'persons');
        });
    })

}