var users = [];

exports.getUsers = function (callback) {
    process.nextTick(function () {
        callback(null, users);
    });
};

exports.getUser = function (id, callback) {
    process.nextTick(function () {
        var i, user;

        for (i = 0; i < users.length; i++) {
            user = users[i];

            if (user.id === id) {
                return callback(null, user);
            }
        }

        callback(); // no user found
    });
};

exports.addUser = function (user, callback) {
    process.nextTick(function () {
        if (!user.name) {
            return new Error('Missing name for user.')
        }

        user.id = (users.length + 1).toString();
        users.push(user);

        callback(null, user);
    });
};