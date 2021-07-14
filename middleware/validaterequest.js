const { validationResult } = require('express-validator')

function validateRequest(req, res, next){
    const errorAddUser = validationResult(req)
    if(!errorAddUser.isEmpty()){
        return res.status(400).json({error: errorAddUser.array()})
    }
    next()
}

module.exports.validateRequest=validateRequest