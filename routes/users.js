/**
 * Users Routes
 */

var users = require('../data/users');
var notLoggedIn = require('./middleware/not_logged_in');
var loadUser = require('./middleware/load_user');


var restrictUserToSelf = require('./middleware/restrict_user_to_self');


module.exports = function(app) {

    app.get('/users', function(req, res) {
      res.render('users/index', { title: 'Users', users: users });
    });


    app.get('/users/new', notLoggedIn, function(req, res) {
       res.render('users/new', { title: 'New User' });
    });

    app.get('/users/:name', loadUser, function(req, res, next) {
        var user = users[req.params.name];
        if (user) {
            res.render('users/profile', {title: 'User profile', user: user});
        } else {
            next();
        }
    });

    app.post('/users', notLoggedIn, function(req, res) {
        if (users[req.body.username]) {
            res.send('Conflict', 409);
        } else {
            users[req.body.username] = req.body;
            res.redirect('/users');
        }
    });

    app.del('/users/:name', loadUser, restrictUserToSelf, function(req, res, next) {
        delete users[req.user.username];
        res.redirect('/users');
    });

    /*
    app.del('/users/:name', loadUser, function(req, res, next) {
        delete users[req.user.username];
        res.redirect('/users');
    });
    app.del('/users/:name', function(req, res, next) {
        if (users[req.params.name]) {
            delete users[req.params.name];
            res.redirect('/users');
        } else {
            next();
        }
    });
    */

};