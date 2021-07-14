const CompanyService=require('../services/companyservices')
const express=require('express')
const router=express.Router()
const logger=require('../logger')('companyroutes')
const { validateRequest } = require('../middleware/validaterequest')
const { validateAddCompanySchema, validateDeleteCompanySchema } = require('../schema/validatecompanyschema')

//Adding company route
router.post('/', validateAddCompanySchema, validateRequest, async (req,res)=>{
    const companyService = new CompanyService(req, res)
    try{
        await companyService.addCompany(req.body.name, req.body.city)
        logger.info(`addCompany executed`)
    }catch(err){
        logger.error(`addCompany returned an error: ${err}`)
    }

    // let response= companyService.addCompany(req)
    // response.then(r=>{
    //     console.log(r)
    //     res.send(r)
    // })
    // .catch(err=>{
    //     console.log(err)
    //     res.send(response)
    // })
})

//Get user from the given company name
router.get('/', validateDeleteCompanySchema, validateRequest, async (req, res)=>{
    const companyService = new CompanyService(req, res)
    try{
        logger.debug(req.body.companyname)
        await companyService.getUserFromCompany(req.body.companyname)
        logger.info(`getUserFromCompany returned`)
    }catch(err){
        logger.error(`getUserFromCompany returned an error: ${err}`)
    }
})

//Deleting company route
router.delete('/', validateDeleteCompanySchema, validateRequest, async (req, res)=>{
    const companyService = new CompanyService(req, res)
    try{
        const response = await companyService.deleteCompany(req.body.companyname)
        logger.info(`deleteCompany returned ${response}`)
    }catch(err){
        logger.error(`deleteCompany returned with an error: ${err}`)
    }

        // let response= companyService.deleteCompany(req)
    // response.then(r=>{
    //     console.log("In delete then block")
    //     res.send(r)
    // })
    // .catch(err=>{
    //     console.log(err)
    //     res.send(response)
    // })
})

module.exports=router