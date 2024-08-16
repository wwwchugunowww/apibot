const sequelize = require('../config/db_config')
const {Sequelize, DataTypes, Table} = require('sequelize')


const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    enrollment_date: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
}, {
    timestamps: true
});

// module.exports = { User };


// const userbot = sequelize.define('userbot', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     chatid: { type: DataTypes.INTEGER, allowNull: false },
//     telephone_telegram: { type: DataTypes.STRING, allowNull: false, validate: { len: [10, 15] } },
//     terminals: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
//     enrollment_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
//     registered_by: { type: DataTypes.STRING, allowNull: false },
//     company_name: { type: DataTypes.STRING, allowNull: false },
//     full_name: { type: DataTypes.STRING, allowNull: false }
// }, {
//     timestamps: true
// });


const userbot = sequelize.define('userbot', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chatid: { type: DataTypes.INTEGER, allowNull: true },
    telephone_telegram: { type: DataTypes.STRING, allowNull: true, validate: { len: [10, 15] } },
    terminals: { type: DataTypes.JSONB, allowNull: true },
    watched: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } },
    // enrollment_date: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
    registered_by: { type: DataTypes.STRING, allowNull: true },
    company_name: { type: DataTypes.STRING, allowNull: true },
    full_name: { type: DataTypes.STRING, allowNull: true }
}, {
    timestamps: true
});


module.exports = { User, userbot };



// bd_name = telegram_bot