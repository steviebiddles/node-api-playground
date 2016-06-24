var app = require('../src/app'),
    assert = require('assert'),
    request = require('supertest');

describe('basic tests', function () {
    var lastUser;

    it('does not do anything', function () {
        assert.equal(true, true);
    });

    it('should get a collection of users', function (done) {
        request(app)
            .get('/users')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                assert.equal(res.body.success, true);
                done();
            });
    });

    it('should add a user', function (done) {
        request(app)
            .post('/users')
            .send({
                name: 'Mr. Tester'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                var result = res.body;

                assert.equal(result.success, true);
                assert.equal(result.user.name, 'Mr. Tester');
                assert(result.user.id > 0);

                lastUser = result.user;
                done();
            });
    });

    it('should get a user', function (done) {
        var id = lastUser.id;

        request(app)
            .get('/users/' + id)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                var result = res.body;

                assert.equal(result.success, true);
                assert.equal(result.user.name, lastUser.name);
                done();
            });
    });
});