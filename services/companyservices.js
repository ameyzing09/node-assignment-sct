const Company=require('../models/companymodel')
const logger = require('../logger')('companyservices')
const errorMessage=require('../constant/errormessage')
const errorResponse=require('../error/errorrequest')
const dbQueryMethod = require('../methods/user.methods')

class CompanyService{
    constructor(req, res){
        // console.log("In company services.....")
        this.req=req
        this.res=res
    }

    //Adding company to the database
    async addCompany(name, cityName){
        const { req, res } = this

        try{
            const [company, created] = await Company.findOrCreate({
                where: {
                    name: name
                },
                defaults: {
                    city: cityName
                }
            })
            console.log(created)
            const newErrorResponse=new errorResponse(company.cno)
            if(created){
                console.log("If : ", created)
                logger.info('Company added successfully')
                return res.status(200).json(newErrorResponse.sendResponseOnSuccess())
            }
            else{
                console.log("else : ", created)
                logger.error('Company already exists')
                return res.status(400).json(newErrorResponse.sendResponseOnFailure(errorMessage.COMPANY_ALREADY_EXISTS))
            }
        }catch(err){
            logger.error(`addCompany returned an error: ${err}`)
            return res.status(500).json(newErrorResponse.sendResponseOnFailure(errorMessage.INTERNAL_ERROR))
        }
        // return Company.create({
        //     name: req.body.name,
        //     city: req.body.city
        // })
        // .then(()=>{
        //     console.log(`${req.body.name} added successfully`)
        //     return `${req.body.name} added successfully`
        // })
        // .catch(err=>{
        //     console.log(err);
        //     return "Failed to add company"
        // })
    }

    //Get user from company with companyname as parameter
    async getUserFromCompany(companyName){
        const { req, res } = this 
        try{
            const getUserName = await dbQueryMethod.getUserFromCompany(companyName)
            const newErrorResponse = new errorResponse(getUserName)
            logger.info(`getUserFromCompany executed`)
            return res.status(200).json(newErrorResponse.sendDataOnSuccess(getUserName))
        }catch(err){
            logger.error(`getUserFromCompany returned an error: ${err}`)
            return res.status(400).json(newErrorResponse.sendResponseOnFailure(errorMessage.USER_NOT_FOUND))
        }
    }

    //Deleting the company from the database
    async deleteCompany(companyName){
        const { req,res } = this
        const newErrorResponse = new errorResponse(req.body)
        try{
            const created = await Company.destroy({
                where: {
                    name: companyName
                }
            })
            if(created)
            {
                console.log("If : ", created)
                logger.info('Deletion successful')
                return res.status(200).json(newErrorResponse.sendDataOnSuccess())
            }
            else
            {
                console.log("else : ", created)
                logger.error('Company deletion error')
                return res.status(400).json(newErrorResponse.sendResponseOnFailure(errorMessage.COMPANY_NOT_FOUND))
            }
        }catch(err){
            logger.error(`deleteCompany returned an error: ${err}`)
            return res.status(500).json(newErrorResponse.sendResponseOnFailure(errorMessage.INTERNAL_ERROR))
        }

        // return Company.destroy({
        //     where: {
        //         name: req.body.name
        //     }
        // })
        // .then(()=>{
        //     return `${req.body.name} deleted successfully`
        // })
        // .catch(err=>{
        //     console.log(err);
        //     return `${req.body.name} invalid`
        // })
    }
}

module.exports = CompanyService