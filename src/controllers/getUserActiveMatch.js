const { UserMatch, User, Match } = require('../models');

const getUserActiveMatch = async (username) => {
  try {
    const user = await User.findByPk(username);
    if (!user) {
      throw new Error('user not found');
    }

    const userMatches = await UserMatch.findAll({
      where: {
        username,
      },
    });

    const userMatchesIds = userMatches.map(userMatch => userMatch.matchId);

    const match = await Match.findOne({
      where: {
        [Op.and]: [{ id: userMatchesIds }, { state: 'en progreso' }]
      },
    });

    return match;
  } catch (error) {
    console.error('Error al obtener match de user:', error);
    throw error;
  }
};

module.exports = getUserActiveMatch;