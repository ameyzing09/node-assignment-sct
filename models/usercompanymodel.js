const Sequelize=require('sequelize')
const dbc=require('../config/databaseConnection.js')

module.exports=dbc.define('usercompany', {
    ucno:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    freezeTableName: true
})