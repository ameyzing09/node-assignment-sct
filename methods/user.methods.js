const Sequelize = require('sequelize')
const dbc = require('../config/databaseconnection')
const logger=require('../logger')('user.methods')

//Database query that used
module.exports = dbQueryMethod = {
    listUserCompanyDetails: async ()=>{
        try{
            return await dbc.query("select u.*, group_concat(if(c.name='', null, c.name) separator ', ') as companies from user u, usercompany uc, company c where u.user_id=uc.user_id and c.cno=uc.cno group by u.user_name, u.user_email, u.user_phone;", {
                type: Sequelize.QueryTypes.SELECT
            })
        }catch(err){
            logger.error(`listUserCompanyDetails returned an error: ${err}`)
            return "Failed to list the company"
        }
    },

    getUserDetails: async (userName, companyName)=>{
        try{
            return await dbc.query("select u.* from user u, company c, usercompany uc where u.user_id=(select user_id from user where user_name='" + userName +"') and c.cno=(select cno from company where name='"+ companyName +"') and u.user_id=uc.user_id and c.cno=uc.cno;",{
                type: Sequelize.QueryTypes.SELECT
            })
        }catch(err){
            logger.error(`getUserDetails returned an error: ${err}`)
            return "Failed to display"
        }
    },

    addUserDetails: async (userName, companyName)=>{
        try{
            return await dbc.query("insert into usercompany (user_id, cno) values ((select user_id from user where user_name='"+ userName +"'), (select cno from company where name='"+ companyName +"'));", {
                type: Sequelize.QueryTypes.INSERT
            })
        }catch(err){
            logger.error(`addUserDetails returned an error: ${err}`)
            return "Failed to allocate user"
        }
    },

    getUserFromCompany: async (companyName)=>{
        try{
            return await dbc.query("select u.user_name from usercompany uc, user u, company c where uc.cno=c.cno and uc.user_id=u.user_id and c.name='"+companyName+"';", {
                type: Sequelize.QueryTypes.SELECT
            })
        }catch(err){
            logger.error(`getUserFromCompany returned an error: ${err}`)
        }
    }

}
