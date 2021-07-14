const Sequelize=require('sequelize')
const dbc=require('../config/databaseconnection.js')
const companyModel=require('../models/companymodel.js')

const User=dbc.define('user', {
        user_id :{
            type:Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name :{
            type:Sequelize.STRING,
            allowNull: false,
        },
        user_email:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        user_phone:{
            type: Sequelize.DOUBLE,
            allowNull: false,
        }
    }, 
        {
            freezeTableName: true
})

User.belongsToMany(companyModel, {
    through: "usercompany"
})

companyModel.belongsToMany(User, {
    through: "usercompany"
})

module.exports=User


