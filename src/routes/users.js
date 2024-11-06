const Router = require('koa-router');
const router = new Router();
const { User } = require('../models');

router.post('/', async (ctx) => {
    console.log(ctx.request.body);
    try {
        const user = await User.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = user;
    
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
    
    }
});

router.get('/:username', async (ctx) => {
    try {
        const user = await User.findByPk(ctx.params.username);
        if (!user) {
          ctx.status = 404;
          ctx.body = { error: 'user not found'};
          return;
        }
        ctx.status = 200;
        ctx.body = user;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
    }
});

module.exports = router;