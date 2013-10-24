/*
 But if you are inside
 a callback and you catch an error, you should call the “next” callback with the error as the fi rst
 argument,
 */
function errorCreator() {
    return function(req, res, next) {
        next(new Error('This is an error'));
    }
}
module.exports = errorCreator;
