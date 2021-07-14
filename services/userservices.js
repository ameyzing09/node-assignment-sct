const User = require('../models/usermodel')
const dbQueryMethod = require('../methods/user.methods')
const logger = require('../logger')('userservices')
const errorResponse = require('../error/errorrequest')
const errorMessage = require('../constant/errormessage')

//Adding user to database function
async function addUser(req, res){
    try{
        const [user, created] = await User.findOrCreate({
            where: {
                user_name: req.body.name
            },
            defaults: {
                user_email: req.body.email,
                user_phone: req.body.phone
            }
        })
        const newErrorResponse = new errorResponse(user.user_id)
        if(!created){
            logger.error('User already exists')
            return res.status(400).json(newErrorResponse.sendResponseOnFailure(errorMessage.USER_ALREADY_EXISTS))
        }
        else{
            logger.info('User created successfully')
            return res.status(200).json(newErrorResponse.sendResponseOnSuccess())
        }
    }catch(e){
        logger.error(`In addUser function: findOrCreate returned an error: ${e}`)
        const newErrorResponse = new errorResponse(req)
        return res.status(400).json(newErrorResponse.sendResponseOnFailure(errorMessage.INTERNAL_ERROR))
    }
}

//Allocating user to the company in database function
async function allocateUser(req, res){
    try{
        const addUserCompany = await dbQueryMethod.addUserDetails(req.body.username, req.body.companyname)
        const newErrorResponse = new errorResponse(addUserCompany[0].ucno)
        logger.info('Allocation successful')
        return res.status(200).json(newErrorResponse.sendResponseOnSuccess())
    }catch(err){
        logger.error(`${err}`)
        res.status(400).json(newErrorResponse.sendResponseOnFailure(errorMessage.USER_ALLOCATION_ERROR))
    }
}

//Get the details of user and the company from database function
async function getUser(req, res){
    const userName = req.body.username
    const companyName = req.body.companyname
    try{    
            const getUserData = await dbQueryMethod.getUserDetails(userName, companyName)
            const newErrorResponse = new errorResponse(getUserData[0].user_id)
            if(getUserData.length === 0){
                logger.error(`User not present in the company`)
                return res.status(400).json(newErrorResponse.sendResponseOnFailure(errorMessage.USER_NOT_FOUND))
            }else{
                logger.info(`User info retrieved`)
                return res.status(200).json(newErrorResponse.sendResponseOnSuccess())
            }
    }catch(err){
        const newErrorResponse = new errorResponse()
        logger.error(`getUser returned an error: ${err}`)
        return res.status(400).json(newErrorResponse.sendResponseOnFailure(errorMessage.INTERNAL_ERROR))
    }
}

//List all the user and companies working in
async function listUser(req, res){
    try{
        const listUserData = await dbQueryMethod.listUserCompanyDetails()
        const newErrorResponse = new errorResponse(listUserData[0])
        logger.info(`User list retrieved`)
        return res.status(200).json(newErrorResponse.sendDataOnSuccess())
    }catch(err){
        logger.error(`listUser returned error: ${err} `)
        return res.status(400).json(newErrorResponse.sendResponseOnFailure(errorMessage.USER_NOT_FOUND))
    }
}

module.exports={
    addUser,
    allocateUser,
    getUser,
    listUser
}