const Sequelize=require('sequelize')
const dbc=require('../config/databaseconnection')
module.exports=dbc.define('company', {
    cno:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    city:{
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true
})