const { UserGroup, User, Group } = require('../models');

const getAllUserGroups = async (username) => {
  try {
    const user = await User.findByPk(username);
    if (!user) {
      throw new Error('user not found');
    }

    const userGroups = await UserGroup.findAll({
      where: {
        username,
      },
    });

    const groupnames = userGroups.map(userGroup => userGroup.groupname);

    const groups = await Group.findAll({
      where: {
        groupname: groupnames,
      },
    });

    return groups;
  } catch (error) {
    console.error('Error al obtener grupos de user:', error);
    throw error;
  }
};

module.exports = getAllUserGroups;