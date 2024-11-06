const Router = require('koa-router');
const router = new Router();
const { User } = require('../models');
const { getAllUserGroups } = require('../models')

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

router.get('/:username/groups', async (ctx) => {
    try {
        const groups = await getAllUserGroups(ctx.params.username);
    
        if (groups.status === 404) {
          ctx.status = 404;
          ctx.body = { error: groups.message };
        } else {
          ctx.status = 200;
          ctx.body = groups;
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
      }
});

router.get('/:username/match', async (ctx) => {
    try {
        const match = await getUserActiveMatch(ctx.params.username);
    
        if (match.status === 404) {
          ctx.status = 404;
          ctx.body = { error: match.message };
        } else {
          ctx.status = 200;
          ctx.body = match;
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
      }
});

router.put('/:id', async (ctx) => {
    try {
        const user = await User.findByPk(ctx.params.id);
    
        if (!user) {
          ctx.status = 404;
          ctx.body = { error: 'match not found'};
          return;
        }
    
        await user.update(ctx.request.body);
        ctx.status = 200;
        ctx.body = user;
    
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
      }
});

module.exports = router;