const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const router = new Router();

router.post("authetication.signup", "/signup", async (ctx) => {
    const authInfo = ctx.request.body;
    let user = await ctx.orm.User.findOne({ where: { email: authInfo.email } });
    if (user) {
        ctx.body = `El usuario con mail ${authInfo.email} ya existe`;
        ctx.status = 400;
        return;
    }
    try {
        user = await ctx.orm.User.create({
            username: authInfo.username,
            email: authInfo.email,
            password: authInfo.password,
            profileImage: authInfo.profileImage,
            wins: authInfo.wins
        });
        console.log(user);
    }
    catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    ctx.body = {
        username: user.username,
        email: user.email,
        password: user.password,
    };
    ctx.status = 201;
});

router.post("authentication.login", "/login", async (ctx) => {
    let user;
    const authInfo = ctx.request.body;
    try {
        user = await ctx.orm.User.findOne({ where: { email:authInfo.email } })
    }
    catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    if (!user) {
        ctx.body = `El usuario con el correo ${authInfo.email} no existe`;
        ctx.status = 400;
        return; 
    }
    if (user.password == authInfo.password) {
        ctx.body = {
            username: user.username,
            password: user.password
        };
    } else {
        ctx.body = 'La contraseña es incorrecta';
        ctx.status = 400;
        return;
    }

    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
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
    }
    ctx.status = 200;
})

//}
module.exports = router;