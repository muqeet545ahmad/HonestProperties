// // 'use strict';

// // /** @type {import('sequelize-cli').Migration} */
// // module.exports = {
// //   async up (queryInterface, Sequelize) {
// //     /**
// //      * Add altering commands here.
// //      *
// //      * Example:
// //      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
// //      */
// //   },

// //   async down (queryInterface, Sequelize) {
// //     /**
// //      * Add reverting commands here.
// //      *
// //      * Example:
// //      * await queryInterface.dropTable('users');
// //      */
// //   }
// // };

// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.addColumn('contactForms', 'user_id', {
//       type: Sequelize.STRING,
//     });
//     await queryInterface.addColumn('contactForms', 'property_id', {
//       type: Sequelize.STRING,
//     });
//     await queryInterface.addColumn('contactForms', 'next_activity_date', {
//       type: Sequelize.DATEONLY, // Assuming you want to store dates for next_activity_date
//       allowNull: true, // Adjust this based on your requirements
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.removeColumn('contactForms', 'user_id');
//     await queryInterface.removeColumn('contactForms', 'property_id');
//     await queryInterface.removeColumn('contactForms', 'next_activity_date');
//   },
// };

// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.addColumn('Contacts', 'user_id', {
//       type: Sequelize.STRING,
//     });
//     await queryInterface.addColumn('Contacts', 'property_id', {
//       type: Sequelize.STRING,
//     });
//      await queryInterface.addColumn('Contacts', 'service_type_id', {
//       type: Sequelize.STRING,
//     });
//     await queryInterface.addColumn('Contacts', 'next_activity_date', {
//       type: Sequelize.DATEONLY, // Assuming you want to store dates for next_activity_date
//       allowNull: true, // Adjust this based on your requirements
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.removeColumn('Contacts', 'user_id');
//     await queryInterface.removeColumn('Contacts', 'property_id');
//     await queryInterface.removeColumn('Contacts', 'service_type_id');
//     await queryInterface.removeColumn('Contacts', 'next_activity_date');
//   },
// };

// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.addColumn('Contacts', 'user_id', {
//       type: Sequelize.STRING,
//     });

//     await queryInterface.addColumn('Contacts', 'property_id', {
//       type: Sequelize.STRING,
//     });

//     await queryInterface.addColumn('Contacts', 'service_type_id', {
//       type: Sequelize.STRING,
//       allowNull: false,
//     });

//     await queryInterface.addColumn('Contacts', 'next_activity_date', {
//       type: Sequelize.DATEONLY,
//       allowNull: true,
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.removeColumn('Contacts', 'user_id');
//     await queryInterface.removeColumn('Contacts', 'property_id');
//     await queryInterface.removeColumn('Contacts', 'service_type_id');
//     await queryInterface.removeColumn('Contacts', 'next_activity_date');
//   },
// };

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Contacts", "user_id", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("Contacts", "property_id", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("Contacts", "next_activity_date", {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Contacts", "user_id");
    await queryInterface.removeColumn("Contacts", "property_id");
    await queryInterface.removeColumn("Contacts", "next_activity_date");
  },
};
