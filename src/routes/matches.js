const Router = require('koa-router');
const router = new Router();
const { Match } = require('../models');

router.post('/', async (ctx) => {
    console.log(ctx.request.body);
    try {
        const match = await Match.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = match;
    
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
    
    }
});

router.get('/private=false', async (ctx) => {
    try {
        const matches = await Match.findAll({
            where: {
                private: false,
              }
        });
        ctx.body = matches;
        ctx.status = 200;
    } catch (error) {
        ctx.body =  { error: error.message};
        ctx.status = 500;
    }
});


router.get('/:id', async (ctx) => {
    try {
        const match = await Match.findByPk(ctx.params.id);
        if (!match) {
          ctx.status = 404;
          ctx.body = { error: 'match not found'};
          return;
        }
        ctx.status = 200;
        ctx.body = match;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
    }
});

module.exports = router;