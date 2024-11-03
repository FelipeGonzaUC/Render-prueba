const Router = require('koa-router');
const router = new Router();
const { Group } = require('../models');

router.post('/', async (ctx) => {
    console.log(ctx.request.body);
    try {
        const group = await Group.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = group;
    
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
    
    }
});

router.get('/:id', async (ctx) => {
    try {
        const group = await Group.findByPk(ctx.params.id);
        if (!group) {
          ctx.status = 404;
          ctx.body = { error: 'group not found'};
          return;
        }
        ctx.status = 200;
        ctx.body = group;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
    }
});

module.exports = router;