const Sequelize=require('sequelize')
require('dotenv').config()
const HOST=process.env.HOST
const DATABASE=process.env.DATABASE
const USER=process.env.USER
const PASSWORD=process.env.PASSWORD


//Initializing MySQL database connection
const sequelize=new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    define:{
        timestamps: false
    }
})

module.exports=sequelize