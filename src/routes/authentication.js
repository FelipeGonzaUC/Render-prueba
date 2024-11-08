const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const router = new Router();
//Expiracion del token
const expirationSeconds = 1 * 60 * 60 * 24;
//CLave JWT
const JWT_PRIVATE_KEY = process.env.JWT_SECRET;

router.post("authetication.signup", "/signup", async (ctx) => {
    const authInfo = ctx.request.body;
    let user = await ctx.orm.User.findOne({ where: { email: authInfo.email } });
    if (user) {
        ctx.body = `El usuario con mail ${authInfo.email} ya existe`;
        ctx.status = 400;
        return;
    }
    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(authInfo.password, saltRounds)

        user = await ctx.orm.User.create({
            username: authInfo.username,
            email: authInfo.email,
            password: hashPassword,
            wins: 0
        });
        console.log(user);
    }
    catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    var token = jwt.sign(
        {scope: ['user']},
        JWT_PRIVATE_KEY,
        {subject: user.username},
        {expiresIn: expirationSeconds}
    );
    ctx.body = {
        "access_token": token,
        "token_type": "Bearer",
        "expires_in": expirationSeconds,
        "username": user.username,
    };
    ctx.status = 201;
});

router.post("authentication.login", "/login", async (ctx) => {
    let user;
    const authInfo = ctx.request.body;
    try {
        user = await ctx.orm.User.findOne({ where: { username:authInfo.username } });
    }
    catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    if (!user) {
        ctx.body = `El usuario con el username ${authInfo.username} no existe`;
        ctx.status = 400;
        return; 
    }

    const checkPassword = await bcrypt.compare(authInfo.password, user.password);

    if (checkPassword) {
        ctx.body = {
            username: user.username,
            password: user.password
        };
    } else {
        ctx.body = 'La contraseña es incorrecta';
        ctx.status = 400;
        return;
    }

    var token = jwt.sign(
        {scope: ['user']},
        JWT_PRIVATE_KEY,
        {subject: user.username},
        {expiresIn: expirationSeconds}
    );
    ctx.body = {
        "access_token": token,
        "token_type": "Bearer",
        "expires_in": expirationSeconds,
        "username": user.username,
    }
    ctx.status = 200;
})

//}
module.exports = router;