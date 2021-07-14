const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const router = require('../routes/companyroutes')
const app = require('../app')
const expect = chai.expect
const should = chai.should()
const CompanyService = require('../services/companyservices')
const Company = require('../models/companymodel')

chai.use(chaiHttp)

//Testing the GET route for getting user of a given company
describe("Getting user from company", ()=>{
    it("GET /company/ : Should return JSON Response if Success with 200 status code", async()=>{
        let res = await chai
            .request('http://localhost:3000')
            .get('/company')
            .send({ "companyname" : "Spring CT"})
            
                // expect(res).to.have.status(200)
                res.should.have.status(200)
                res.type.should.equal('application/json')
                res.body.should.include.keys('data')

         
            
        // let req, res
        // req = {}
        // res = {
        //     status: sinon.spy(),
        //     json: sinon.spy()
        // }
        // const stub = sinon.stub(Company, "findOrCreate").returns(companyDetails)
        // const companyService = new CompanyService(req, res)
        // const companyDetail = await companyService.addCompany(companyDetails.name, companyDetails.city)
        // expect(stub.calledOnce).to.be.true
        // expect(companyDetail.name).to.equal(companyDetails.name)
        // expect(companyDetail.city).to.equal(companyDetails.city)
    })

    // it("GET /company/ : Should return JSON response with 400 status code", async ()=>{
    //     let res = await chai
    //         .request('http://localhost:3000')
    //         .get('/company')
    //         .send({ "companyname" : "Spring CT"})
    //         res.should.have.status(400)    
    //     })
        
})

//Testing POST route for add a company
describe('Add Company', ()=>{

    it('POST /company should return JSON response if successful with 200 status code', async ()=>{
        let companyData = {
            "name": "Siemens",
            "city": "Pune"
        }
        let res = await chai
            .request('http://localhost:3000')
            .post('/company')
            .send(companyData)
            
            res.should.have.status(200)
            res.type.should.equal('application/json')
            res.body.should.include.keys('data')
            res.body.data.should.not.be.null
    })

    afterEach(async()=>{
        await Company.destroy({
            where: {
                name: "Siemens"
            }
        })
    })
})

describe('Delete company', ()=>{
    beforeEach(async()=>{
        await Company.create({
            "name" : "Zensar",
            "city" : "Pune"
        })
    })

    it('DELETE /company/ : Should return an JSON Response with status code 200', async ()=>{
        let companyData = {
            "companyname" : "Zensar"
        }

        let res = await chai
            .request('http://localhost:3000')
            .delete('/company')
            .send(companyData)

            res.should.have.status(200)
    })
})
