var connect = require('connect');

// import middlewares
var helloWorld = require('./hello_world');

var errorCreator = require('./error_creator');
var saveRequest = require('./save_request');
var writeHeader = require('./write_header');
var replyText = require('./reply_text');
var errorHandler = require('./error_handler');

var app = connect.createServer(
    errorCreator(),
    saveRequest(__dirname + '/requests'),
    writeHeader('X-Powered-By', 'Node'),
    replyText('Hello World!'),
    helloWorld,
    errorHandler()
);

app.use(connect.logger());
//app.use(connect.logger('tiny'));

app.use(function(req, res) {
    res.end('Hello World');
});
app.listen(8080);