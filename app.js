const express=require("express")
require('dotenv').config()
const app=express()

const companyRoutes=require('./routes/companyroutes')
const userRoutes=require('./routes/userroutes')
const dbc=require('./config/databaseConnection.js')
const logger = require("./logger")('app')

app.use(express.json())

app.use('/company', companyRoutes)
app.use('/user', userRoutes)

dbc.authenticate()
.then(()=>{
    logger.info(`Connection successful`)
})
.catch(err=>{
    logger.error(`Database connection error: ${err}`)
})

app.get('/',(req, res)=>{
    res.send("Homepage")
})


app.listen(process.env.PORT, ()=>{
    logger.info(`Listening on port ${process.env.PORT}`)
})


