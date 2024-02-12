
'use strict';
const { v4: uuid } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const ContactProvider = sequelize.define('ContactProvider', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    ContactProvider.beforeCreate((contactProvider, _) => {
        return contactProvider.id = uuid();
    });

 

    return ContactProvider;
};
