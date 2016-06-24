var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    v8debug = require('v8-debug'),
    users = require('./../lib/users');

module.exports = app;

app.use(morgan('dev'));
app.use(bodyParser.json());

/**
 * @api {get} / Request Homepage
 * @apiName GetHomepage
 * @apiGroup Homepage
 *
 * @apiSampleRequest off
 *
 * @apiVersion 0.1.0
 */
app.get('/', function (req, res) {
    res.send('Hello world!');
});

app.get('/users', function (req, res) {
    users.getUsers(function (err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                reason: err.message
            });
        }

        res.json({
            success: true,
            users: result
        });
    });
});

/**
 * @api {get} /users/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Object} user User object from data store.
 * @apiSuccess {Object} user.id Users id.
 * @apiSuccess {String} user.name Users name.
 * @apiSuccessExample {json} Success-Response:
 *      {"success":true,"user":{"id":"1","name":"Stephen"}}
 *
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * @apiErrorExample {json} Error-Response:
 *      {"success":false,"reason":"user id not found"}
 */
app.get('/users/:id', function (req, res) {
    var id = req.params.id;

    users.getUser(id, function (err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                reason: err.message
            });
        }

        if (!result) {
            return res.status(404).json({
                success: false,
                reason: 'user id not found'
            });
        }

        res.json({
            success: true,
            user: result
        });
    });
});

app.post('/users', function (req, res) {
    var user = req.body;

    users.addUser(user, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                reason: err.message
            });
        }

        res.json({
            success: true,
            user: result
        });
    });
});

app.listen(3000, function () {
    console.log('Listening on http://localhost:3000')
});
