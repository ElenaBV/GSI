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
      category: 'Автомобили',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      category: 'Одежда',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      category: 'Гарри-Поттер',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      category: 'Пословицы / Поговорки / Выражения',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
