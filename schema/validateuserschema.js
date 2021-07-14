const { body } = require('express-validator')

const validateAddUserSchema = [
    body('name').not().isEmpty().trim(),
    body('email').isEmail(),
    body('phone').not().isEmpty().trim()
]

const validateCompanyUserSchema = [
    body('username').not().isEmpty().trim(),
    body('companyname').not().isEmpty().trim()
]
module.exports = {
    validateAddUserSchema,
    validateCompanyUserSchema
}