const { body } = require('express-validator')

const validateAddCompanySchema = [
    body('name').not().isEmpty().trim(),
    body('city').not().isEmpty().trim()
]

const validateDeleteCompanySchema = [
    body('companyname').not().isEmpty().trim()
]

module.exports = {
    validateAddCompanySchema,
    validateDeleteCompanySchema
}