const Router = require('koa-router');
const router = new Router();
const { Invitation } = require('../models');

router.post('/', async (ctx) => {
    console.log(ctx.request.body);
    try {
        const invitation = await Invitation.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = invitation;
    
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
    
    }
});

router.get('/:id', async (ctx) => {
    try {
        const invitation = await Invitation.findByPk(ctx.params.id);
        if (!invitation) {
          ctx.status = 404;
          ctx.body = { error: 'invitation not found'};
          return;
        }
        ctx.status = 200;
        ctx.body = invitation;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
    }
});

module.exports = router;