

"use strict";
const { v4: uuid } = require("uuid");
const ContactProvider = require('./Contact_TypeProvider');

module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define("Contacts", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    property_id: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    contact_number_country: {
      type: DataTypes.STRING,
      validate: {
        isValidCountryCode(value) {
          const isoCountryCodePattern = /^\+\d{1,4}$/;
          if (!isoCountryCodePattern.test(value)) {
            throw new Error(
              "Invalid country code. Must be a valid ISO dial code."
            );
          }
        },
      },
    },
    mobile_number_country: {
      type: DataTypes.STRING,
      validate: {
        isValidCountryCode(value) {
          const isoCountryCodePattern = /^\+\d{1,4}$/;
          if (!isoCountryCodePattern.test(value)) {
            throw new Error(
              "Invalid country code. Must be a valid ISO dial code."
            );
          }
        },
      },
    },
    mobile_number: {
      type: DataTypes.BIGINT,
      validate: {
        isNumeric: true,
        validateIfMobileCountryCodeProvided(value) {
          if (this.mobile_number_country && !value) {
            throw new Error(
              "Mobile Number is required when Mobile Number Country Code is specified."
            );
          }
        },
      },
    },
    contact_number: {
      type: DataTypes.BIGINT,
      validate: {
        isNumeric: true,
        validateIfCountryCodeProvided(value) {
          if (this.contact_number_country && !value) {
            throw new Error(
              "Contact Number is required when Contact Number Country Code is specified."
            );
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        customRegex(value) {
          if (!/^[\w\.-]+@[\w\.-]+\.\w+$/.test(value)) {
            throw new Error("Email must match the pattern *@*.");
          }
        },
      },
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  //   service_type_id: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  // },
  service_type: {
      type: DataTypes.STRING,
      allowNull: false
  },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      },
    },
    last_activity_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      validate: {
        isPastDate(value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const inputDate = new Date(value);
          inputDate.setHours(0, 0, 0, 0);

          if (!isNaN(inputDate.getTime()) && inputDate <= today) {
            return true;
          }

          throw new Error("Last Activity Date cannot be a future date.");
        },
      },
    },
    next_activity_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      validate: {
        isValidDate(value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const inputDate = new Date(value);
          inputDate.setHours(0, 0, 0, 0);

          if (!isNaN(inputDate.getTime()) && inputDate >= today) {
            return true;
          }

          throw new Error("Next Activity Date must be today or a future date.");
        },
      },
    },
  });
  Contacts.beforeCreate((contacts, _) => {
    return (contacts.id = uuid());
  });

Contacts.associate = (models) => {
  Contacts.belongsTo(models.ContactProvider, {
    foreignKey: 'service_type',
      targetKey: 'id',
      onDelete: 'SET NULL', 
  });
};


  return Contacts;
};

