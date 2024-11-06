const { UserMatch, User, Match } = require('../models');

const getAllMatchUsers = async (matchId) => {
  try {
    const match = await Match.findByPk(matchId);
    if (!match) {
      throw new Error('match not found');
    }

    const userMatches = await UserMatch.findAll({
      where: {
        matchId,
      },
    });

    const usernames = userMatches.map(userMatch => userMatch.username);

    const users = await User.findAll({
      where: {
        username: usernames,
      },
    });

    return users;
  } catch (error) {
    console.error('Error al obtener users de match:', error);
    throw error;
  }
};

module.exports = getAllMatchUsers;