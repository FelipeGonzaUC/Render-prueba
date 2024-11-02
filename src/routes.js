const Router = require('koa-router');
const messages = require('./routers/groups');
const messages = require('./routers/invitations');
const chats = require('./routers/matches');
const users = require('./routers/users');

const router = new Router();

router.use('/groups', chats.routes());
router.use('/invitations', messages.routes());
router.use('/matches', users.routes());
router.use('/users', users.routes());

module.exports = router;