const { UserGroup, User, Group } = require('../models');

const getAllGroupUsers = async (groupname) => {
  try {
    const group = await Group.findByPk(groupname);
    if (!group) {
      throw new Error('group not found');
    }

    const userGroups = await UserGroup.findAll({
      where: {
        groupname,
      },
    });

    const usernames = userGroups.map(userGroup => userGroup.username);

    const users = await User.findAll({
      where: {
        username: usernames,
      },
    });

    return users;
  } catch (error) {
    console.error('Error al obtener users de group:', error);
    throw error;
  }
};

module.exports = getAllGroupUsers;