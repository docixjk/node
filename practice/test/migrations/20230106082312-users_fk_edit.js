'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'thdguswn93@naver.com',
        password: '1234',
        githubId: 'hyunju-song',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('bootcamp_lists', [
      {
        name: 'codestates',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = await queryInterface.sequelize.query(`SELECT id FROM users;`);
    const bootcamp = await queryInterface.sequelize.query(`SELECT id FROM bootcamp_lists`);
    const usersRows = users[0];
    const bootcampRows = bootcamp[0];

    await queryInterface.bulkInsert('users_bootcamp', [
      {
        users_id: usersRows[0].id,
        bootcamp_id: bootcampRows[0].id,
      },
    ]);

    return await queryInterface.bulkInsert('reviews', [
      {
        users_id: usersRows[0].id,
        bootcamp_id: bootcampRows[0].id,
        githublink: 'https://github.com/codestates/SAFU-server.git',
        price: '비쌈',
        level: '어려움',
        recommend: '추천',
        curriculum: '어려움',
        comment: '자기주도 학습!!!!중심이다',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('bootcamp_lists', null, {});
    await queryInterface.bulkDelete('users_bootcamp', null, {});
    await queryInterface.bulkDelete('reviews', null, {});
  },
};
