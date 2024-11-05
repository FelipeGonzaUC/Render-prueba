var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


function getJWTScope(token) {
    const secret = process.env.JWT_SECRET;
    var payload = jwt.verify(token, secret);
    return payload.scope;
}

async function isUser(ctx, next) {
    await next();
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    ctx.assert(scope.includes('user'), 403, "You are not a user");
}

//Funcion verificadora scope admin

async function isAdmin(ctx, next) {
    await next();
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    ctx.assert(scope.includes('admin'), 403, "You are not an Admin");
}

module.exports = {
    isUser, isAdmin
};