/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      id: 1,
      category: 'Elbrus',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      category: 'Спорт',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      category: 'Кино',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      category: 'Цитаты Джесона Стэтхема',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      category: 'Олег',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
   ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};