const Router = require('koa-router');
const router = new Router();
const { User } = require('../models');
const { getAllUserGroups } = require('../models')
const bcrypt = require('bcrypt');
const authUtils = require("../lib/auth/jwt")
/*
*Ejemplo de proteccion de ruta, "/users/example" verifica si el token es de un user
router.get("/example", authUtils.isUser, async (ctx) => {
  ctx.body = {
    message: "Acceso autorizado tu ser user"
  }
})*/

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

router.put('/:username', async (ctx) => {
    //Expiracion del token
    const expirationSeconds = 1 * 60 * 60 * 24;
    //CLave JWT
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    try {
        const user = await User.findByPk(ctx.params.username);
        if (!user) {
          ctx.status = 404;
          ctx.body = { error: 'match not found'};
          return;
        }
        const checkPassword = await bcrypt.compare(ctx.request.body.confirm, user.password);
        if (checkPassword) {
          if (ctx.request.body.password) {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(ctx.request.body.password, saltRounds);
            ctx.request.body.password = hashPassword;
          } else {
            ctx.request.body.password = user.password;
          }
          await user.update(ctx.request.body);
          ctx.status = 200;
          ctx.body = user;
        } else {
          ctx.status = 400;
          ctx.body = "Contraseña Incorrecta";
          return;
        }
    
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message};
      }
});

router.delete('/:id', async (ctx) => {
  try {
      const user = await User.findByPk(ctx.params.id);
  
      if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'group not found'};
        return;
      }

      await user.destroy();
      ctx.status = 204;
      ctx.body = user;

  } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message};
  }
});

module.exports = router;