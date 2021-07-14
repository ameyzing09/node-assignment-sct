const userAdd = require('../services/userservices')
const express = require('express')
const router = express.Router()
const logger=require('../logger')('userroute')
const { validateRequest } = require('../middleware/validaterequest')
const { validateAddUserSchema, validateCompanyUserSchema } = require('./validateuserschema')

//Adding user route (name, email, phone) to the database
router.post('/',validateAddUserSchema, validateRequest, async (req, res)=>{
    try{
        await userAdd.addUser(req, res)
        logger.info(`addUser returned`)
    }catch(err){
        logger.error(`addUser returned an error: ${err}`)
    }
})

//Allocating user to the company (username, companyname)
router.post('/allocateUser', validateCompanyUserSchema, validateRequest, async (req, res)=>{
    try{
        const response = await userAdd.allocateUser(req, res)
        logger.info(`allocateUser returned: ${response}`)
    }catch(err){
        logger.error(`allocateUser returned an error: ${err}`)
    }
})

//Get details of user if present in the company (username, companyname)
router.post('/getUser', validateCompanyUserSchema, validateRequest, async (req, res)=>{
    try{
        await userAdd.getUser(req, res)
        logger.info(`getUser executed`)
    }catch(err){
        logger.error(`getUser returned an error: ${err}`)
    }
})

//Get all user list with companies working in seperted by comma.
router.get('/', async (req, res)=>{
    try{
        const response = await userAdd.listUser(req, res)
        logger.info(`listUser returned: ${response}`)
    }catch(err){
        logger.error(`listUser returned an error: ${err}`)
    }
})

module.exports=router