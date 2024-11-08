const Router = require('koa-router');
//const messages = require('./routers/groups');
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt');
const messages = require('./routes/invitations');
const chats = require('./routes/matches');
const users = require('./routes/users');
const auth = require('./routes/authentication');

const router = new Router();

dotenv.config();

//router.use('/users', users.routes());
router.use('/groups', chats.routes());
router.use('/invitations', messages.routes());
router.use('/matches', users.routes());
router.use(auth.routes());

//Colocar Desde Aqui Rutas Protegidas
router.use(jwtMiddleware( { secret: process.env.JWT_SECRET } ));
router.use('/users', users.routes());

module.exports = router;